import React, { useState } from "react";
import "./CreateQuiz.scss";
import ManualTab from "./ManualTab";
import RightTab from "./RightTab";
import UploadTab from "./UploadTab";
import { useAuth } from "../auth/AuthContext";
import axiosInstance from "../../axiosInstance";
import TextAiTab from "./TextAiTab";
import * as pdfjsLib from "pdfjs-dist";

const CreateQuiz = () => {
  const [activeTab, setActiveTab] = useState("Upload");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState(null);
  const [questionType, setQuestionType] = useState("Multiple single choice");
  const [numQuestions, setNumQuestions] = useState(1);
  const [level, setLevel] = useState("Easy");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [refreshLocalQuiz, setRefreshLocalQuiz] = useState(true);
  const [aiQuizGenerated, setAiQuizGenerated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploadQuizGenerated, setuploadQuizGenerated] = useState(true);
  const [pdfText, setPdfText] = useState("");
  const { getUser } = useAuth();
  const handleGenerateQuiz = async () => {
    // Validate inputs
    if (!title.trim()) {
      alert("Please provide a title for the quiz.");
      return;
    }
    if (!document) {
      alert("Please upload a valid document.");
      return;
    }

    setLoading(true);

    try {
      // Create FormData to handle the file upload along with other form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("questionType", questionType);
      formData.append("numberOfQuestions", numQuestions);
      formData.append("level", level.toLowerCase());
      if (startPage) formData.append("startPage", startPage);
      if (endPage) formData.append("endPage", endPage);
      formData.append("pdf", document); // Attach the uploaded file

      console.log("FormData to be sent:", formData);

      // Make the API request
      const response = await axiosInstance.post(
        "http://localhost:5001/api/quiz/genrateQuizUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the API response
      if (response.status === 200) {
        const generatedQuiz = response.data;
        console.log("Quiz generated successfully:", generatedQuiz);

        alert("Quiz generated successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to generate quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error while generating quiz:", error);
      alert("An error occurred. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];

    // Validate file existence
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    // Validate file type
    const validFileTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validFileTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PDF or JPEG/PNG image.");
      return;
    }

    // Validate file size (5 MB = 5 * 1024 * 1024 bytes)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds 5 MB. Please upload a smaller file.");
      return;
    }

    // Update state with the selected file
    setDocument(file);

    // Optional: Notify user about the selected file
    alert(`File "${file.name}" selected successfully.`);
  };

  //   const handleGenerateQuiz = async () => {
  //     /* call this api http://localhost:5001/api/quiz/genrateQuizUsingAI
  //        pass body {
  //     "title": "AI QUIZ",
  //     "questionType": "Multiple Choice",
  //     "numberOfQuestions": 10,
  //     "level": "easy",
  //     "startPage": 1,
  //     "endPage": 40,
  //     "pdfText": ""
  // }
  //     in such way and get the response and print in review you quiz segment
  //     */
  //   };
  const renderUploadTab = () => (
    <>
      {/* <UploadTab
        uploadQuizGenerated={uploadQuizGenerated}
        setuploadQuizGenerated={setuploadQuizGenerated}
        setUploadModalOpen={setUploadModalOpen}
        document={document}
        setLoading={setLoading}
      /> */}
      <div className="form-container">
        <form>
          <div className="form-group">
            <label>Choose Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="form-group">
            <label>Enter a title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Upload a document</label>
            <button type="button" onClick={() => setUploadModalOpen(true)}>
              Upload a doc
            </button>
            {document && <small>Selected file: {document.name}</small>}
            <small>Supports .pdf & .jpeg document formats</small>
          </div>
          <div className="form-group">
            <label>Question type</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="Multiple single choice">
                Multiple single choice
              </option>
              <option value="Multiple multiple choice">
                Multiple multiple choice
              </option>
              <option value="True/False">True/False</option>
            </select>
          </div>
          <div className="form-group">
            <label>Number of questions</label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start page (Optional)</label>
            <input
              type="text"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>End page (Optional)</label>
            <input
              type="text"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleGenerateQuiz}
            className="generate-button"
          >
            Generate
          </button>
        </form>
      </div>
    </>
  );

  const renderTextAiTab = () => (
    <TextAiTab
      aiQuizGenerated={aiQuizGenerated}
      setAiQuizGenerated={setAiQuizGenerated}
      setLoading={setLoading}
    />
  );

  const renderManualTab = () => (
    <ManualTab
      refreshLocalQuiz={refreshLocalQuiz}
      setRefreshLocalQuiz={setRefreshLocalQuiz}
    />
  );

  return (
    <div className="create-quiz-page">
      <div className="container">
        <div className="left">
          <div className="left-header">
            <h2>Create Quiz</h2>
          </div>
          <div className="tabs">
            <button
              className={activeTab === "Upload" ? "active" : ""}
              onClick={() => setActiveTab("Upload")}
            >
              Upload
            </button>
            <button
              className={activeTab === "Text/AI" ? "active" : ""}
              onClick={() => setActiveTab("Text/AI")}
            >
              Text/AI
            </button>
            <button
              className={activeTab === "Manual" ? "active" : ""}
              onClick={() => setActiveTab("Manual")}
            >
              Manual
            </button>
          </div>
          {activeTab === "Upload" && renderUploadTab()}
          {activeTab === "Text/AI" && renderTextAiTab()}
          {activeTab === "Manual" && renderManualTab()}

          {uploadModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Upload a document</h2>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleDocumentUpload}
                />
                <small>DOCX, JPEG, JPG, PNG, and PDF formats up to 5 MB</small>
                <div className="modal-actions">
                  <button onClick={() => setUploadModalOpen(false)}>
                    Cancel
                  </button>
                  <button onClick={() => setUploadModalOpen(false)}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right">
          {/* <div className='right-header'>
            <button type="button" className="publish-button">
              Publish
            </button>
          </div> */}
          <RightTab
            refreshLocalQuiz={refreshLocalQuiz}
            activeTab={activeTab}
            aiQuizGenerated={aiQuizGenerated}
            uploadQuizGenerated={uploadQuizGenerated}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
