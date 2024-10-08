import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import Axios
import './StudentAiTutorAichat.scss'; // Import your SCSS file here

const StudentAiTutorAichat = ({ Aichattitle }) => {
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTitleDropdownOpen, setIsTitleDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // State to handle side menu toggle
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const chatAreaRef = useRef(null); // Create a ref for the chat area

  const handleAskQuestion = async () => {
    if (question) {
      const userMessage = { sender: "user", text: question };
      setChatMessages([...chatMessages, userMessage]);
      setQuestion(""); // Reset question input
      setIsLoading(true); // Set loading spinner while waiting for bot response

      try {
        // Prepare a detailed message for the chat completion API
        const messages = [
          { role: "system", content: "You are a friendly and helpful tutor named Curio Ai." },
          {
            role: "user",
            content: `Subject: ${Aichattitle.subject}\nLanguage: ${Aichattitle.language}\nClass: ${Aichattitle.class}\nTopic: ${Aichattitle.topic}\n\nQuestion: ${question}\n\nPlease provide a friendly, educational, and detailed answer.`,
          },
        ];

        // Call OpenAI Chat Completion API for bot response
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `Bearer sk-fCTQ0PeogLBJ-iZswUO7dWtDx0z3AcbU1ywQWGq63MT3BlbkFJyk_Xb9X_AeGkG8_Ish7mUHE3JmhGV0yPr_ODirkLwA`, // Use your API key here
              "Content-Type": "application/json",
            },
          }
        );

        const botMessage = {
          sender: "bot",
          text: response.data.choices[0].message.content.trim(), // Get bot response from the API response
        };

        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Oops! Something went wrong. Please try again." },
        ]);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    }
  };

  const handleSuggestionClick = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
    handleAskQuestion();
  };

  // Scroll to the bottom of the chat area whenever chatMessages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div style={{ backgroundColor: "white", height: "86vh" }}>
      <div className="Ai-chat-container">
        <div className="chat-header">
          <div
            className="chat-title"
            onClick={() => setIsTitleDropdownOpen(!isTitleDropdownOpen)}
          >
            Chat Title
            <span className={`dropdown-icon ${isTitleDropdownOpen ? "open" : ""}`}>
              &#9660;
            </span>
          </div>
          {isTitleDropdownOpen && (
            <div className="title-dropdown">
              <p>
                <strong>Subject:</strong> {Aichattitle.subject}
              </p>
              <p>
                <strong>Language:</strong> {Aichattitle.language}
              </p>
              <p>
                <strong>Class:</strong> {Aichattitle.class}
              </p>
              <p>
                <strong>Topic:</strong> {Aichattitle.topic}
              </p>
            </div>
          )}
          <button
            className="side-menu-button"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          >
            &#9776;
          </button>
        </div>

        <div className={`side-menu ${isSideMenuOpen ? "open" : ""}`}>
          <button
            className="close-menu-button"
            onClick={() => setIsSideMenuOpen(false)}
          >
            &times;
          </button>
          <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </div>

        <div className="chat-area" ref={chatAreaRef}>
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
          {isLoading && <div className="loading-spinner">Loading...</div>}
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
