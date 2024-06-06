import React, { useState } from 'react';
import './CreateQuiz.scss';

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
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');

  const handleDocumentUpload = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleGenerateQuiz = () => {
    // Handle quiz generation logic
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const renderUploadTab = () => (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label>Choose Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter a title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Upload a document</label>
          <button type="button" onClick={() => setUploadModalOpen(true)}>Upload a doc</button>
          {document && <small>Selected file: {document.name}</small>}
          <small>Supports .pdf & .jpeg document formats</small>
        </div>
        <div className="form-group">
          <label>Question type</label>
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="Multiple single choice">Multiple single choice</option>
            <option value="Multiple multiple choice">Multiple multiple choice</option>
            <option value="True/False">True/False</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of questions</label>
          <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
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
          <input type="text" value={startPage} onChange={(e) => setStartPage(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End page (Optional)</label>
          <input type="text" value={endPage} onChange={(e) => setEndPage(e.target.value)} />
        </div>
        <button type="button" onClick={handleGenerateQuiz} className="generate-button">
          Generate
        </button>
      </form>
    </div>
  );

  const renderTextAiTab = () => (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label>Choose Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter a title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Biology" />
        </div>
        <div className="form-group">
          <label>Enter a topic or link</label>
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Question type</label>
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="Multiple single choice">Multiple single choice</option>
            <option value="Multiple multiple choice">Multiple multiple choice</option>
            <option value="True/False">True/False</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of questions</label>
          <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="button" onClick={handleGenerateQuiz} className="generate-button">
          Generate
        </button>
      </form>
    </div>
  );

  const renderManualTab = () => (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label>Choose Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter a title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Enter your question</label>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your question here" />
        </div>
        {options.map((option, index) => (
          <div className="form-group" key={index}>
            <label>Option {String.fromCharCode(65 + index)}</label>
            <div className="option-input">
              <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
              <button type="button" onClick={() => handleRemoveOption(index)}>X</button>
            </div>
          </div>
        ))}
        <div className="form-group">
          <label>Answer</label>
          <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
            {options.map((option, index) => (
              <option key={index} value={option}>Option {String.fromCharCode(65 + index)}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleGenerateQuiz} className="generate-button">
          Add Question
        </button>
      </form>
    </div>
  );

  return (
    <div className="create-quiz-page">
      <div className="header">
        <h1>Create Quiz</h1>
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
  );
};

export default CreateQuiz;
