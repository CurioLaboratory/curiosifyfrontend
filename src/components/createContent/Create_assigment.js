import React, { useState } from "react";
import "./Createcontent.scss";


//store the values of each dropdown
const CreateAssignment = () => {
  const [selectedOption, setSelectedOption] = useState({
    learningObjectives: "",
    assignmentType: "",
    grading: "",
    class: "",
    language: "",
  });

  // this usestate is to store the file in learning object dropdown
  const [file, setFile] = useState(null);  


  //this usestate is used for toggle dropdown
  const [dropdownOpen, setDropdownOpen] = useState({
    learningObjectives: false,
    assignmentType: false,
    grading: false,
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
   // console.log(selectedOption.grading);
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
      console.log(selectedOption.learningObjectives);
      if(file){
        //to display file in console
        console.log("File",file);
    } 
    } 
    else {
      // Display error or handle accordingly
      console.log("Please enter learning objectives or attach a file");
    }
  };

  

  return (
    <div className="parentdiv">
      <div className="heading">
        <h2>Create Assignment</h2>
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
                    <button className="attach-file-button"  onClick={handleNext}>Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="option">
            <div className="dropdown">
              <button
                className="option-button"
                onClick={() => toggleDropdown("assignmentType")}
              >
                {selectedOption.assignmentType || "Assignment type"}
              </button>
              {dropdownOpen.assignmentType && (
                <div className="dropdown-content">
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleOptionSelect("assignmentType", "Short form")
                    }
                  >
                    Short form
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      handleOptionSelect("assignmentType", "Long form")
                    }
                  >
                    Long form
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="option">
            <div className="dropdown">
              <button
                className="option-button"
                onClick={() => toggleDropdown("grading")}
              >
                {selectedOption.grading.name || "Grading"}
              </button>
              {dropdownOpen.grading && (
                <div className="learning-objectives-section">
                <label htmlFor="learningObjectives" className="label-text">
                 Grading Criteria
                </label>
                <textarea
                  id="grading"
                  name="grading"
                  value={
                    selectedOption.grading.name ||
                    selectedOption.grading
                  }
                  onChange={handleInputChange}
                  className="learning-objectives-textarea"
                />
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
          <h3>Preview</h3>
          <p>Complete required fields to preview assignment.</p>
        </div>
      </div>
      <div className="assignment-actions">
        <button className="regenerate-button">Regenerate</button>
        <button className="create-button">Create</button>
      </div>
    </div>
  );
};

export default CreateAssignment;
