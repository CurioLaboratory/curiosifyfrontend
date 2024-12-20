import React, { useState } from "react";
import "./Create_assigment.scss";
import PreviewAssignment from "./PreviewAssignment";
import { jsPDF } from "jspdf";
import { useAuth } from "../auth/AuthContext";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
//store the values of each dropdown
const CreateAssignment = () => {
  const [assignmentGenerated, setAssignmentGenerated] = useState(false);
  const [assignment, setAssignment] = useState({});
  const [selectedOption, setSelectedOption] = useState({
    learningObjectives: "",
    assignmentType: "",
    grading: "",
    class: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuth();

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
      if (file) {
        //to display file in console
        console.log("File", file);
      }
    } else {
      // Display error or handle accordingly
      console.log("Please enter learning objectives or attach a file");
    }
  };

  const handleGenerateAssignment = async () => {
    if (
      !selectedOption.assignmentType ||
      !selectedOption.grading ||
      !selectedOption.learningObjectives ||
      !selectedOption.language ||
      !selectedOption.class
    ) {
      return;
    }
    setLoading(true);
    const url = "http://localhost:5001/api/content/createAssignment";

    // The data you need to send in the request body
    const requestData = {
      httpMethod: "POST",
      assignmentType: selectedOption.assignmentType,
      grading: selectedOption.grading,
      learningObjectives: selectedOption.learningObjectives,
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
      setLoading(false);
      // const data = JSON.parse(responseText);
      console.log(responseText);
      setAssignment(responseText);
      setAssignmentGenerated(!assignmentGenerated);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (!assignment) {
      return;
    }
    const user = getUser();
    const publishedAssignment = {
      assignmentTitle: assignment["Assignment Title"],
      assignmentObjective: assignment.Objective,
      assignmentGrading: assignment.Grading,
      Instructions: assignment.Instructions?.map((instruction, index) => ({
        index: index + 1, // Assign an index to each instruction
        title: instruction,
      })),
      createdBy: user.email,
    };

    const response = await axiosInstance.post(
      "/createCourse/saveAssignmentData",
      publishedAssignment
    );
    if (response.status === 201) {
      toast.success("Assignment saved successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      // alert('Quiz published successfully!');

      setAssignment({});
    }

    if (response.status === 203) {
      alert(response.data.message);
    }
  };
  const handleDownload = () => {
    const data = assignment;

    if (Object.keys(data).length === 0) {
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let currentY = 10; // Initial Y position
    const lineHeight = 10; // Line height

    const addWrappedText = (text, x, y, maxWidth) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line) => {
        // Add a new page if the content exceeds the page height
        if (y + lineHeight > pageHeight) {
          doc.addPage();
          y = 10; // Reset Y position for new page
        }
        doc.text(line, x, y);
        y += lineHeight; // Increment Y position for the next line
      });
      return y; // Return the updated Y position
    };

    try {
      // Add the assignment title
      doc.setFontSize(16);
      currentY = addWrappedText(
        "Assignment Title:",
        10,
        currentY,
        pageWidth - 20
      );
      doc.setFontSize(12);
      currentY = addWrappedText(
        String(data["Assignment Title"] || ""),
        10,
        currentY,
        pageWidth - 20
      );

      // Add the objective
      doc.setFontSize(16);
      currentY = addWrappedText("Objective:", 10, currentY, pageWidth - 20);
      doc.setFontSize(12);
      currentY = addWrappedText(
        String(data["Objective"] || ""),
        10,
        currentY,
        pageWidth - 20
      );

      // Add the grading
      doc.setFontSize(16);
      currentY = addWrappedText("Grading:", 10, currentY, pageWidth - 20);
      doc.setFontSize(12);
      currentY = addWrappedText(
        String(data["Grading"] || ""),
        10,
        currentY,
        pageWidth - 20
      );

      // Add the instructions
      doc.setFontSize(16);
      currentY = addWrappedText("Instructions:", 10, currentY, pageWidth - 20);
      doc.setFontSize(12);
      (data["Instructions"] || []).forEach((instruction, index) => {
        currentY = addWrappedText(
          `${index + 1}. ${String(instruction)}`,
          10,
          currentY,
          pageWidth - 20
        );
      });

      // Download the PDF
      doc.save(`${data["Assignment Title"]}.pdf`);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };
  return (
    <div className="craeteassigment-parentdiv">
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
                      selectedOption.grading.name || selectedOption.grading
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
          <div className="PreviewContainer">
            <h3>Preview</h3>
            <button className="downloadButton" onClick={handleDownload}>
              D
            </button>
          </div>
          <PreviewAssignment
            assignmentGenerated={assignmentGenerated}
            assignment={assignment}
            loading={loading}
          />
        </div>
      </div>
      <div className="assignment-actions">
        <button
          className="regenerate-button"
          onClick={handleGenerateAssignment}
        >
          Regenerate
        </button>
        <button className="create-button" onClick={handleCreateAssignment}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateAssignment;