import React, { useState, useEffect, useRef } from 'react';
import './StudentDocChatAi.scss'; // Import your SCSS file here

const StudentDocChatAi = ({ fileData }) => {
  const [documents, setDocuments] = useState(fileData ? [fileData] : []); // Initialize with provided fileData
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to force re-render of input
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for the file input

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleFileUpload = (event) => {
    const newDocument = event.target.files[0];
    if (newDocument) {
      setDocuments([...documents, newDocument]);
      resetFileInput(); // Reset input after file is selected
    }
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleAskQuestion = () => {
    if (question) {
      setChatMessages([...chatMessages, { sender: "user", text: question }]);
      setQuestion("");
      // Add the logic for bot response here
    }
  };

  const resetFileInput = () => {
    setFileInputKey(Date.now()); // Force re-render of the file input
  };

  return (
    <div className="document-upload-page">
      <div className="document-section">
        <h2>Sources</h2>
        <div className="document-grid">
          {documents.map((doc, index) => (
            <div key={index} className="document-item">
              <img
                src={URL.createObjectURL(doc)}
                alt={doc.name}
                className="document-thumbnail"
              />
              <p>{doc.name}</p>
              <button onClick={() => handleRemoveDocument(index)}>Remove</button>
            </div>
          ))}
          <div className="upload-more">
            <input
              type="file"
              id="file-input"
              key={fileInputKey} // Use key to force re-render
              hidden
              onChange={handleFileUpload}
              ref={fileInputRef} // Attach ref
            />
            <label htmlFor="file-input" className="upload-label">
              Upload More Files
            </label>
          </div>
        </div>
      </div>

      <div className="Docchat-Ai-chat-container">
        <div className="chat-area">
          {chatMessages.length === 0 ? (
            <div className="chat-suggestions">
              <h3>Start a conversation!</h3>
              <ul>
                <li onClick={() => setQuestion("Tell me about AI")}>
                  Tell me about AI
                </li>
                <li onClick={() => setQuestion("What is machine learning?")}>
                  What is machine learning?
                </li>
                <li onClick={() => setQuestion("How do neural networks work?")}>
                  How do neural networks work?
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
          <div ref={chatEndRef} /> {/* Empty div for scrolling to bottom */}
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

export default StudentDocChatAi;
