import React, { useState } from 'react';
import './CreateQuiz.scss';
import { useAuth } from '../auth/AuthContext';
import { toast } from 'react-toastify';

function UploadTab(props) {
  const [language, setLanguage] = useState('English');
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState('Multiple single choice');
  const [numQuestions, setNumQuestions] = useState(1);
  const [level, setLevel] = useState('Easy');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  

  const { getUser } = useAuth();

  const handleGenerateQuiz = async () => {
    props.setLoading(true);
    // Handle quiz generation logic
    const quizRequestData = {
      subject: title,
      ton: level,
      numQuestions: numQuestions,
      questionType: "MCQ",
      documentLink: props.document,
      language: language
    };
  
    try {
      // 1. Make a POST request to the external API to generate the quiz
      const externalResponse = await fetch("https://bhghddzlvw7366bldu3vpzmj4u0dordd.lambda-url.us-east-1.on.aws/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizRequestData),
      });
  
      if (!externalResponse.ok) {
        throw new Error("Failed to generate quiz from external API");
      }
  
      const quizdata = await externalResponse.json();
      console.log(quizdata)

      const user = getUser();
      // this data will send to backend for saving into database
      const publishedQuiz = {
        title: quizRequestData.subject, 
        date: new Date().toLocaleDateString(),
        language: quizRequestData.language,
        totalQuestions: quizdata.length,
        questions: quizdata.map(item => ({
            question: item.question,
            options: [item.option1, item.option2, item.option3, item.option4],
            answer: item.correctOption
        })),
        createdBy: user.email
    };
    console.log(publishedQuiz)

    
    localStorage.setItem('uploadTabQuiz', JSON.stringify(publishedQuiz));
    props.setuploadQuizGenerated(!props.uploadQuizGenerated);

    setTitle('')
    setQuestionType('Multiple single choice')
    setNumQuestions('1')
    setLevel('easy')
    setStartPage('')
    setEndPage('')
    
    toast.success("Quiz question added successfully!", {
        position: "top-right",
        autoClose: 1000
    });

    //   const response = await axiosInstance.post("/quiz/createAIquiz",publishedQuiz)
  
    //   if (response.status !== 201) { // Check for status code 201 for successful creation
    //     throw new Error("Failed to save quiz in the backend database");
    //   }
  
    //   const savedQuizData = await response.data;
  
      
    //   console.log("Quiz generated and saved successfully:", savedQuizData);
  
    } catch (error) {
    
      console.error("Error:", error.message);
    }finally {
      props.setLoading(false); // Step 3: Set loading to false after the request
    }
  };

  return <div className="form-container">
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
      <button type="button" onClick={() => props.setUploadModalOpen(true)}>Upload a doc</button>
      {props.document && <small>Selected file: {props.document.name}</small>}
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
</div>;
};

export default UploadTab;
