import React, { useState } from "react";
import "./Createcontent.scss";
import PreviewCourse from "./PreviewCourse";
import { useAuth } from "../auth/AuthContext";
import axiosInstance from "../../axiosInstance";
//store the values of each dropdown
const CreateCourse = ({ setCurrentPage, setChapterModuleData }) => {
  const [selectedOption, setSelectedOption] = useState({
    learningObjectives: "",
    subject: "",
    class: "",
    language: "",
  });
  const { getUser } = useAuth();
  const [courseGenerated, setCourseGenerated] = useState(false);
  const data = [
    {
      Chapter: "Introduction to Light and Matter",
      Modules: [
        {
          Name: "The Nature of Light",
          Explanation:
            "Light is a form of electromagnetic radiation that is visible to the human eye. ...",
        },
        {
          Name: "Interaction of Light with Matter",
          Explanation:
            "When light encounters matter, it can be absorbed, reflected, transmitted, or refracted. ...",
        },
        {
          Name: "The Electromagnetic Spectrum",
          Explanation:
            "The electromagnetic spectrum is the range of all possible frequencies of electromagnetic radiation, ...",
        },
      ],
    },
    {
      Chapter: "Principles of Optics",
      Modules: [
        {
          Name: "Reflection and Refraction",
          Explanation:
            "Reflection is the process by which light bounces off a surface. ...",
        },
        {
          Name: "Diffraction and Interference",
          Explanation:
            "Diffraction is the bending of light around obstacles, resulting in the spreading out of light waves. ...",
        },
        {
          Name: "Polarization",
          Explanation:
            "Polarization is the process by which the oscillations of a light wave are confined to a certain direction. ...",
        },
      ],
    },
    {
      Chapter: "Optical Instruments",
      Modules: [
        {
          Name: "Lenses and Mirrors",
          Explanation:
            "Lenses and mirrors are optical instruments that manipulate light to form images. ...",
        },
        {
          Name: "Microscopes and Telescopes",
          Explanation:
            "Microscopes and telescopes are optical instruments that magnify objects. ...",
        },
        {
          Name: "Optical Communications",
          Explanation:
            "Optical communications involve transmitting information using light. ...",
        },
      ],
    },
    {
      Chapter: "Advanced Topics in Optics",
      Modules: [
        {
          Name: "Quantum Optics",
          Explanation:
            "Quantum optics is the study of the quantum mechanical properties of light. ...",
        },
        {
          Name: "Nonlinear Optics",
          Explanation:
            "Nonlinear optics is the study of the interaction of light with matter in which the response of the material is nonlinear. ...",
        },
        {
          Name: "Photonics",
          Explanation:
            "Photonics is the science and technology of generating, controlling, and detecting photons, the particles of light. ...",
        },
      ],
    },
  ];

  // this usestate is to store the file in learning object dropdown
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  //this usestate is used for toggle dropdown
  const [dropdownOpen, setDropdownOpen] = useState({
    learningObjectives: false,
    subject: false,
    class: false,
    language: false,
  });

  //function to toggle dropdown
  const toggleDropdown = (option) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  //function to handle textarea
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOption((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(selectedOption.subject);
  };

  //function to upload file
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  //function to select values from dropdown and store them in corresponding usestate
  const handleOptionSelect = (option, value) => {
    setSelectedOption((prev) => ({
      ...prev,
      [option]: value,
    }));
    toggleDropdown(option); // Close the dropdown after selection
    //console.log(option, value);
  };

  //Function to handle next click in learningobject dropdown
  const handleNext = () => {
    // Check if textarea has a value or a file is attached
    if (selectedOption.learningObjectives.trim()) {
      // Proceed to next step
      // console.log(selectedOption.learningObjectives);
      if (file) {
        //to display file in console
        console.log("File", file);
      }
    } else {
      // Display error or handle accordingly
      console.log("Please enter learning objectives or attach a file");
    }
  };
  function convertData(data) {
    return data.map((chapterObj) => {
      const chapterName = Object.keys(chapterObj)[0]; // Get chapter name
      const modules = chapterObj[chapterName]; // Get the module contents

      const moduleList = Object.keys(modules).map((moduleName) => {
        return {
          Name: moduleName.split(": ")[1], // Extract the name after "Module X: "
          Explanation: modules[moduleName], // Get the explanation from the original object
        };
      });

      return {
        Chapter: chapterName.split(": ")[1], // Extract the chapter name after "Chapter X: "
        Modules: moduleList,
      };
    });
  }
  const handleGenerateCourse = async () => {
    localStorage.removeItem("createCourses");
    setLoading(true);
    const url = "http://localhost:5001/api/content/createCourse";

    // The data you need to send in the request body
    const requestData = {
      httpMethod: "POST",
      subject: selectedOption.subject,
      learning_objectives: selectedOption.learningObjectives,
      language: selectedOption.language,
    };

    try {
      // Fetch data from the endpoint using POST
      const response = await fetch(url, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Set the request headers
        },
        body: JSON.stringify(requestData), // Send the request data as JSON
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Get the response first, if it's a string
      const responseText = await response.json();
      console.log(responseText);
      // Convert the string response to JSON
      // const data = JSON.parse(responseText);
      // console.log(typeof data);
      /// const result = convertData(data);
      //console.log(result)
      // const ans = JSON.stringify(result, null, 2);
      // const ans2 = JSON.parse(ans);
      // console.log(ans2);
      // Store the fetched data in localStorage with key "createCourses"
      localStorage.setItem("createCourses", JSON.stringify(responseText.course));

      setCourseGenerated(!courseGenerated);
      console.log("Data successfully fetched and stored in localStorage!");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateCourse = async () => {
    const user = getUser();
    console.log(user);
    const saveData = {
      Chapters: data, // This is the chapters array you've already defined
      createdBy: user.email, // Assuming user.email holds the creator's email
    };
    const response = await axiosInstance.post(
      "/createCourse/saveChapterData",
      saveData
    );
    if (response.status === 201) {
      console.log("good");
    }
  };
  return (
    <div className="createcourse-parentdiv">
      <div className="heading">
        <h2>Create Course</h2>
      </div>

      <div className="assignment-container">
        <div className="assignment-options">
          <div className="option">
            <div className="dropdown">
              <button
                className="option-button"
                onClick={() => toggleDropdown("learningObjectives")}
              >
                {selectedOption.learningObjectives.name ||
                  "Learning objectives"}
              </button>
              {dropdownOpen.learningObjectives && (
                <div className="learning-objectives-section">
                  <label htmlFor="learningObjectives" className="label-text">
                    Learning objectives
                  </label>
                  <textarea
                    id="learningObjectives"
                    name="learningObjectives"
                    value={
                      selectedOption.learningObjectives.name ||
                      selectedOption.learningObjectives
                    }
                    onChange={handleInputChange}
                    className="learning-objectives-textarea"
                  />
                  <div className="learning-object-button">
                    <button
                      className="attach-file-button"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Attach File
                    </button>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    <button className="attach-file-button" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="option">
            <div className="dropdown">
              <button
                className="option-button"
                onClick={() => toggleDropdown("subject")}
              >
                {selectedOption.subject || "subject"}
              </button>
              {dropdownOpen.subject && (
                <div className="dropdown-content">
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionSelect("subject", "Optics")}
                  >
                    Optics
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionSelect("subject", "English")}
                  >
                    English
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="option">
            <div className="dropdown">
              <button
                className="option-button"
                onClick={() => toggleDropdown("class")}
              >
                {selectedOption.class || "Class"}
              </button>
              {dropdownOpen.class && (
                <div className="dropdown-content">
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionSelect("class", "Class 1")}
                  >
                    Class 1
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionSelect("class", "Class 2")}
                  >
                    Class 2
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="option">
            <div className="dropdown">
              <button
                className="option-button"
                onClick={() => toggleDropdown("language")}
              >
                {selectedOption.language || "Language"}
              </button>
              {dropdownOpen.language && (
                <div className="dropdown-content">
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionSelect("language", "English")}
                  >
                    English
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => handleOptionSelect("language", "Hindi")}
                  >
                    Hindi
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="assignment-preview">
          {/* <p>Complete required fields to preview assignment.</p>  */}
          <PreviewCourse
            setCurrentPage={setCurrentPage}
            setChapterModuleData={setChapterModuleData}
            courseGenerated={courseGenerated}
            loading={loading}
          />
        </div>
      </div>
      <div className="assignment-actions">
        <button className="regenerate-button" onClick={handleGenerateCourse}>
          Regenerate
        </button>
        <button className="create-button" onClick={handleCreateCourse}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;