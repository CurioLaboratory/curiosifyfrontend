import React, { useState } from 'react';
import './StudentAiTutorAichat.scss'; // Import your SCSS file here

const StudentAiTutorAichat = ({ Aichattitle }) => {
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTitleDropdownOpen, setIsTitleDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // State to handle side menu toggle

  const handleAskQuestion = () => {
    if (question) {
      setChatMessages([...chatMessages, { sender: "user", text: question }]);
      setQuestion(""); // Reset question input
      // Add logic for bot responses here if necessary
    }
  };

  const handleSuggestionClick = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
    handleAskQuestion();
  };

  return (
    <div style={{ backgroundColor: 'white', height: '86vh' }}>
      <div className="Ai-chat-container">
        <div className="chat-header">
          <div
            className="chat-title"
            onClick={() => setIsTitleDropdownOpen(!isTitleDropdownOpen)}
          >
            Chat Title
            <span className={`dropdown-icon ${isTitleDropdownOpen ? 'open' : ''}`}>&#9660;</span>
          </div>
          {isTitleDropdownOpen && (
            <div className="title-dropdown">
              <p><strong>Subject:</strong> {Aichattitle.subject}</p>
              <p><strong>Language:</strong> {Aichattitle.language}</p>
              <p><strong>Class:</strong> {Aichattitle.class}</p>
              <p><strong>Topic:</strong> {Aichattitle.topic}</p>
            </div>
          )}
          {/* Side Menu Button */}
          <button className="side-menu-button" onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
            &#9776; {/* Hamburger icon */}
          </button>
        </div>

        <div className={`side-menu ${isSideMenuOpen ? 'open' : ''}`}>
          <button className="close-menu-button" onClick={() => setIsSideMenuOpen(false)}>
            &times; {/* Close icon */}
          </button>
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </div>

        <div className="chat-area">
          {chatMessages.length === 0 ? (
            <div className="chat-suggestions">
              <h3>Start a conversation!</h3>
              <ul>
                <li onClick={() => handleSuggestionClick("What do I need to know to understand this topic?")}>
                  What do I need to know to understand this topic?
                </li>
                <li onClick={() => handleSuggestionClick("What topics should I explore after this topic?")}>
                  What topics should I explore after this topic?
                </li>
              </ul>
            </div>
          ) : (
            chatMessages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))
          )}
        </div>

        <div className="question-section">
          <div className="question-input">
            <input
              type="text"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleAskQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAiTutorAichat;
