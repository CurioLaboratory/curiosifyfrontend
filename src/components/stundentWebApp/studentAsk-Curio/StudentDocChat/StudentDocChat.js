import React, { useState } from "react";
import "./StudentDocChat.scss";

const StudentDocChat = ({ setCurrentPage, setFileData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Maximum allowed file size in bytes (10 MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    processFile(uploadedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const uploadedFile = event.dataTransfer.files[0];
    processFile(uploadedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (uploadedFile) => {
    if (uploadedFile) {
      if (uploadedFile.size > MAX_FILE_SIZE) {
        setError("Allowed file size is up to 10MB");
        setFile(null);
        setSuccessMessage("");
      } else {
        setFile(uploadedFile);
        setError("");
        setSuccessMessage(`File "${uploadedFile.name}" uploaded successfully.`);
        // Simulate storing file - Replace with actual upload logic if needed
        // Example: send the file to server or use state for further processing
      }
    }
  };

  const handleContinue = () => {
    if (file) {
      // Pass file data to the parent component or context
      setFileData(file); // Assuming setFileData is a function that stores file data
      setCurrentPage('StudentDocChatAi'); // Navigate to the next page
    }
  };

  return (
    <div className="upload-container">
      <h2 className="title">Hello You, Upload and chat with your documents</h2>
      <p className="subtitle">
        Upload lecture notes, articles, any document, really, and Curiosify will help you
        understand them. You can chat with multiple documents at the same time.
      </p>
      <div 
        className={`upload-box ${isDragging ? "dragging" : ""}`} 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <h3>Upload a document</h3>
        <div className="file-upload">
          <input type="file" id="file-input" hidden onChange={handleFileChange} />
          <label htmlFor="file-input" className="file-drop">
            <span>Drag and drop or <span className="choose-file">Choose File</span></span>
          </label>
          <p className="file-types">DOCX, JPEG, JPG, PNG and PDF formats (up to 10 MB)</p>
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={() => setFile(null)}>Cancel</button>
          <button className="continue-button" disabled={!file} onClick={handleContinue}>Continue</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default StudentDocChat;
