import React, { useState } from "react";
import "./StudentAiTutor.scss"; // Import the SCSS file

const StudentAiTutor = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(""); // State to store the selected topic
  const [recents, setRecents] = useState([]); // State to store recent selections

  const handleSubjectChange = (e) => {
    const newSubject = e.target.value;
    setSelectedSubject(newSubject);
   
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
  
  };

  const handleClassChange = (e) => {
    const newClass = e.target.value;
    setSelectedClass(newClass);
    
  };

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    setSelectedTopic(newTopic);
    // Add this combination to recents
    setRecents([
      ...recents,
      `${newTopic}`,
    ]);
  };

  return (
    <div className="StudentAiTutorcontainer">
      <h1 className="welcome-text">Welcome Back, Parshya</h1>

      {/* Display Selected Subject with Edit Icon */}
      {selectedSubject && (
        <div className="subject-display">
          <span>
            Subject - {selectedSubject}{" "}
            <span role="img" aria-label="edit" onClick={() => setSelectedSubject("")}>
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
            <span role="img" aria-label="edit" onClick={() => setSelectedLanguage("")}>
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
            <span role="img" aria-label="edit" onClick={() => setSelectedClass("")}>
              ✏️
            </span>
          </span>
        </div>
      )}

      {/* Input and Dropdown Container */}
      <div className="input-container">
        <input
          type="text"
          placeholder="What subject would you like to start with?"
          className="input"
          disabled={!!selectedSubject} // Disable input if subject is selected
        />

        {!selectedSubject ? (
          <select className="select" onChange={handleSubjectChange}>
            <option>Select Subject</option>
            <option>Maths</option>
            <option>Physics</option>
            <option>Chemistry</option>
          </select>
        ) : !selectedLanguage ? (
          <select className="select" onChange={handleLanguageChange}>
            <option>Select Language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        ) : !selectedClass ? (
          <select className="select" onChange={handleClassChange}>
            <option>Select Class</option>
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
          </select>
        ) : (
          <select className="select" onChange={handleTopicChange}>
            <option>Select Topic</option>
            <option>Algebra</option>
            <option>Geometry</option>
            <option>Calculus</option>
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
  );
};

export default StudentAiTutor;
