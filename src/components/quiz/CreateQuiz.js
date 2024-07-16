import React, { useState } from 'react';
import './CreateQuiz.scss';
import ManualTab from './ManualTab';
import RightTab from './RightTab';

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
  const [refreshLocalQuiz, setRefreshLocalQuiz] = useState(true);

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
          <RightTab refreshLocalQuiz={refreshLocalQuiz} />
        </div>
      </div>

    </div>
  );
};

export default CreateQuiz;
