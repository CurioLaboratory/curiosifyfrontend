import React, { useState } from 'react';
import './CreateQuiz.scss';
import ManualTab from './ManualTab';
import RightTab from './RightTab';
import UploadTab from './UploadTab';
import { useAuth } from '../auth/AuthContext';
import axiosInstance from "../../axiosInstance";
import TextAiTab from './TextAiTab';

const CreateQuiz = () => {
  const [activeTab, setActiveTab] = useState('Upload');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [title, setTitle] = useState('');
  const [document, setDocument] = useState(null);
  const [questionType, setQuestionType] = useState('Multiple single choice');
  const [numQuestions, setNumQuestions] = useState(1);
  const [level, setLevel] = useState('Easy');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [refreshLocalQuiz, setRefreshLocalQuiz] = useState(true);
  const [aiQuizGenerated, setAiQuizGenerated] = useState(true);
  const [loading, setLoading] = useState(false); 
  const [uploadQuizGenerated, setuploadQuizGenerated] = useState(true);

  const handleDocumentUpload = (event) => {
    setDocument(event.target.files[0]);
  };

  // const handleGenerateQuiz = async () => {
  //   // Handle quiz generation logic
  //   const quizRequestData = {
  //     subject: title,
  //     ton: level,
  //     numQuestions: numQuestions,
  //     questionType: "MCQ",
  //     youtubeURL: "",
  //     documentLink: "",
  //     language: language
  //   };
  
  //   try {
  //     // 1. Make a POST request to the external API to generate the quiz
  //     const externalResponse = await fetch("https://bhghddzlvw7366bldu3vpzmj4u0dordd.lambda-url.us-east-1.on.aws/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(quizRequestData),
  //     });
  
  //     if (!externalResponse.ok) {
  //       throw new Error("Failed to generate quiz from external API");
  //     }
  
  //     const quizdata = await externalResponse.json();
  //     console.log(quizdata)

  //     const user = getUser();
  //     // this data will send to backend for saving into database
  //     const publishedQuiz = {
  //       title: quizRequestData.subject, 
  //       date: new Date().toLocaleDateString(),
  //       language: quizRequestData.language,
  //       totalQuestions: quizdata.length,
  //       questions: quizdata.map(item => ({
  //           question: item.question,
  //           options: [item.option1, item.option2, item.option3, item.option4],
  //           answer: item.correctOption
  //       })),
  //       createdBy: user.email
  //   };
  //   console.log(publishedQuiz)

    


  //     const response = await axiosInstance.post("/quiz/createAIquiz",publishedQuiz)
  
  //     if (response.status !== 201) { // Check for status code 201 for successful creation
  //       throw new Error("Failed to save quiz in the backend database");
  //     }
  
  //     const savedQuizData = await response.data;
  
      
  //     console.log("Quiz generated and saved successfully:", savedQuizData);
  
  //   } catch (error) {
    
  //     console.error("Error:", error.message);
  //   }
  // };

  const renderUploadTab = () => (
  <UploadTab uploadQuizGenerated={uploadQuizGenerated} setuploadQuizGenerated={setuploadQuizGenerated} setUploadModalOpen={setUploadModalOpen} document={document} setLoading={setLoading}/>
    // <div className="form-container">
    //   <form>
    //     <div className="form-group">
    //       <label>Choose Language</label>
    //       <select value={language} onChange={(e) => setLanguage(e.target.value)}>
    //         <option value="English">English</option>
    //         <option value="Spanish">Spanish</option>
    //         <option value="French">French</option>
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <label>Enter a title</label>
    //       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    //     </div>
    //     <div className="form-group">
    //       <label>Upload a document</label>
    //       <button type="button" onClick={() => setUploadModalOpen(true)}>Upload a doc</button>
    //       {document && <small>Selected file: {document.name}</small>}
    //       <small>Supports .pdf & .jpeg document formats</small>
    //     </div>
    //     <div className="form-group">
    //       <label>Question type</label>
    //       <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
    //         <option value="Multiple single choice">Multiple single choice</option>
    //         <option value="Multiple multiple choice">Multiple multiple choice</option>
    //         <option value="True/False">True/False</option>
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <label>Number of questions</label>
    //       <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
    //     </div>
    //     <div className="form-group">
    //       <label>Level</label>
    //       <select value={level} onChange={(e) => setLevel(e.target.value)}>
    //         <option value="Easy">Easy</option>
    //         <option value="Medium">Medium</option>
    //         <option value="Hard">Hard</option>
    //       </select>
    //     </div>
    //     <div className="form-group">
    //       <label>Start page (Optional)</label>
    //       <input type="text" value={startPage} onChange={(e) => setStartPage(e.target.value)} />
    //     </div>
    //     <div className="form-group">
    //       <label>End page (Optional)</label>
    //       <input type="text" value={endPage} onChange={(e) => setEndPage(e.target.value)} />
    //     </div>
    //     <button type="button" onClick={handleGenerateQuiz} className="generate-button">
    //       Generate
    //     </button>
    //   </form>
    // </div>
  );

  const renderTextAiTab = () => (
    <TextAiTab aiQuizGenerated={aiQuizGenerated} setAiQuizGenerated={setAiQuizGenerated} setLoading={setLoading}/>
  );

  const renderManualTab = () => (
   <ManualTab refreshLocalQuiz={refreshLocalQuiz} setRefreshLocalQuiz={setRefreshLocalQuiz} />
  );

  return (
    <div className="create-quiz-page">
      <div className="container">
        <div className="left">
          <div className="left-header">
            <h2>Create Quiz</h2>
          </div>
          <div className="tabs">
            <button className={activeTab === 'Upload' ? 'active' : ''} onClick={() => setActiveTab('Upload')}>Upload</button>
            <button className={activeTab === 'Text/AI' ? 'active' : ''} onClick={() => setActiveTab('Text/AI')}>Text/AI</button>
            <button className={activeTab === 'Manual' ? 'active' : ''} onClick={() => setActiveTab('Manual')}>Manual</button>
          </div>
          {activeTab === 'Upload' && renderUploadTab()}
          {activeTab === 'Text/AI' && renderTextAiTab()}
          {activeTab === 'Manual' && renderManualTab()}

          {uploadModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Upload a document</h2>
                <input type="file" onChange={handleDocumentUpload} />
                <small>DOCX, JPEG, JPG, PNG, and PDF formats up to 5 MB</small>
                <div className="modal-actions">
                  <button onClick={() => setUploadModalOpen(false)}>Cancel</button>
                  <button onClick={() => setUploadModalOpen(false)}>Continue</button>
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
          <RightTab refreshLocalQuiz={refreshLocalQuiz} activeTab={activeTab}  aiQuizGenerated={aiQuizGenerated} uploadQuizGenerated={uploadQuizGenerated} loading={loading}/>
        </div>
      </div>

    </div>
  );
};

export default CreateQuiz;
