import React, { useState, useEffect } from "react";
import "./StudentAiTutor.scss"; // Import the SCSS file

const StudentAiTutor = ({ setCurrentPage, setAichattitle }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [recents, setRecents] = useState([]);

  // Handle dropdown change functions
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    setSelectedTopic(newTopic);
    // Add this combination to recents
    setRecents([...recents, newTopic]);
  };

  // Check if all selections are made, then set the page and title
  useEffect(() => {
    if (selectedSubject && selectedLanguage && selectedClass && selectedTopic) {
      setAichattitle((prevTitle) => ({
        ...prevTitle,
        subject: selectedSubject,
        language: selectedLanguage,
        class: selectedClass,
        topic: selectedTopic
      }));
      
      setCurrentPage("StudentAiTutorAichat");
    }
  }, [selectedSubject, selectedLanguage, selectedClass, selectedTopic, setAichattitle, setCurrentPage]);

  return (
    <div className="StudentAiTutorcontainer">
      <div className="StudentAitTutorContent">
        <h1 className="welcome-text">Welcome Back, Parshya</h1>
        <div className="SelectedItemsDropdown">
          {/* Display Selected Subject with Edit Icon */}
          {selectedSubject && (
            <div className="subject-display">
              <span>
                Subject - {selectedSubject}{" "}
                <span
                  role="img"
                  aria-label="edit"
                  onClick={() => setSelectedSubject("")}
                  style={{ cursor: "pointer" }}
                >
                  ✏️
                </span>
              </span>
            </div>
          )}

          {/* Display Selected Language with Edit Icon */}
          {selectedLanguage && (
            <div className="language-display">
              <span>
                Language - {selectedLanguage}{" "}
                <span
                  role="img"
                  aria-label="edit"
                  onClick={() => setSelectedLanguage("")}
                  style={{ cursor: "pointer" }}
                >
                  ✏️
                </span>
              </span>
            </div>
          )}

          {/* Display Selected Class with Edit Icon */}
          {selectedClass && (
            <div className="class-display">
              <span>
                Class - {selectedClass}{" "}
                <span
                  role="img"
                  aria-label="edit"
                  onClick={() => setSelectedClass("")}
                  style={{ cursor: "pointer" }}
                >
                  ✏️
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Input and Dropdown Container */}
        <div className="input-container">
          <input
            type="text"
            placeholder="What subject would you like to start with?"
            className="input"
            disabled={!!selectedSubject} // Disable input if subject is selected
          />

          {!selectedSubject ? (
            <select
              className="select"
              onChange={handleSubjectChange}
              value={selectedSubject}
            >
              <option value="" disabled hidden>
                Select Subject
              </option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          ) : !selectedLanguage ? (
            <select
              className="select"
              onChange={handleLanguageChange}
              value={selectedLanguage}
            >
              <option value="" disabled hidden>
                Select Language
              </option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          ) : !selectedClass ? (
            <select
              className="select"
              onChange={handleClassChange}
              value={selectedClass}
            >
              <option value="" disabled hidden>
                Select Class
              </option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
            </select>
          ) : (
            <select
              className="select"
              onChange={handleTopicChange}
              value={selectedTopic}
            >
              <option value="" disabled hidden>
                Select Topic
              </option>
              <option value="Algebra">Algebra</option>
              <option value="Geometry">Geometry</option>
              <option value="Calculus">Calculus</option>
            </select>
          )}
        </div>

        <div className="subject-container">
          <button className="subject-button">Maths</button>
          <button className="subject-button">Physics</button>
          <button className="subject-button">Chemistry</button>
        </div>

        <h3 className="recents-text">Recents</h3>
        <div className="recent-container">
          {recents.map((recent, index) => (
            <button key={index} className="recent-button">
              {recent}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAiTutor;
