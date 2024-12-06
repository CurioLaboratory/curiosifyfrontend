import React, { useState } from 'react';
import './CreateQuiz.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../auth/AuthContext';

import axiosInstance from "../../axiosInstance"; // Import axiosInstance for API calls
function TextAiTab(props) {
    const [language, setLanguage] = useState('English');
    const [title, setTitle] = useState('');
    const [questionType, setQuestionType] = useState('MCQ');
    const [numQuestions, setNumQuestions] = useState(1);
    const [level, setLevel] = useState('Easy');
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const { getUser } = useAuth();
    const [classLevel, setClassLevel] = useState('9');
  
    const handleGenerateQuiz = async () => {
      localStorage.removeItem("textAiTabQuiz");
      console.log({ level, numQuestions, language, topic, questionType });
  
      if (!title || !level || !numQuestions || !language || !topic || !questionType) {
          toast.info("Fields are missing!", {
              position: "top-right",
              autoClose: 1000,
          });
          return;
      }
  
      if (isNaN(parseInt(numQuestions, 10))) {
          toast.error("Number of questions must be a valid number!", {
              position: "top-right",
              autoClose: 1000,
          });
          return;
      }
  
      props.setLoading(true);
  
      const payload = {
          language: language,
          title: title,
          subject: subject,
          topic: topic,
          questionType: questionType,
          level: level,
          numberOfQuestions: parseInt(numQuestions, 10), // Convert to number
      };
      console.log(payload);
  
      try {
        const response = await axiosInstance.post(`/quiz/genrateQuizText`, payload);
        console.log(response);
        
        if (response.status !== 201) {
            throw new Error("Failed to generate quiz from external API");
        }
    
       // Example quizData with question and answer:
const quizData = [
  {
    question: "Which part of the human body is the skull found? Answer: B) Head", // Example question with answer in it
    options: ["A) Arm", "B) Head", "C) Leg", "D) Foot"],
  },
  {
    question: "What is the largest organ in the human body? Answer: B) Skin", // Another question with answer
    options: ["A) Brain", "B) Skin", "C) Heart", "D) Liver"],
  },
];
        
        // Then you can use this data in your JSX code
        
        console.log("Response from API:", quizData);
    
        const user = getUser();
    
        // Process the quiz data to create clearer objects
        const questions = quizData.map((item) => {
          // Extract the answer from the question string if it's present
          let answer = null;
          if (item.question.includes("Answer:")) {
            const answerMatch = item.question.split("Answer:")[1].trim();
            answer = answerMatch;
          }
        
          return {
            type: "MCQ", // Assuming it's always MCQ, you can add conditions if needed for other types
            question: item.question.replace(/Answer:.*$/, '').trim(), // Remove "Answer:" and the answer part from the question
            options: item.options || [], // Use the options provided
            answer: answer, // Store the extracted answer
          };
        });
    console.log(quizData);
        const publishedQuiz = {
            title: title,
            subject: subject,
            date: new Date().toLocaleDateString(),
            language: language,
            totalQuestions: quizData.length,
            questions: questions,
            classLevel: classLevel,
            createdBy: user.email,
            collegeName: user.collegeName,
        };
    
        localStorage.setItem("textAiTabQuiz", JSON.stringify(publishedQuiz));
        props.setAiQuizGenerated(!props.aiQuizGenerated);
        setTitle("");
        setQuestionType("MCQ");
        setNumQuestions("1");
        setLevel("easy");
        setSubject("");
    
        toast.success("Quiz generated successfully!", {
            position: "top-right",
            autoClose: 1000,
        });
    } catch (error) {
        toast.error("Error Fetching, try again!", {
            position: "top-right",
            autoClose: 1000,
        });
        console.error("Error:", error.message);
    } finally {
        props.setLoading(false);
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
      <label>Subject</label>
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Biology" />
    </div>
    <div className="form-group">
                    <label>Choose Class</label>
                    <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)}>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
    <div className="form-group">
      <label>Enter a topic or link</label>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Question type</label>
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
        <option value="MCQ">Multiple single choice</option>
        <option value="Subjective">Subjective</option>
        <option value="MCQ+Subjective">Subjective + MCQ</option>
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
</div>;
};

export default TextAiTab;
