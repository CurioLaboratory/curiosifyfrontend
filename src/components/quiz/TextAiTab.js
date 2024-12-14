<<<<<<< HEAD
import React, { useState } from "react";
import "./CreateQuiz.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/AuthContext";

function TextAiTab(props) {
  const [language, setLanguage] = useState("English");
  const [title, setTitle] = useState("");
  const [questionType, setQuestionType] = useState("MCQ");
  const [numQuestions, setNumQuestions] = useState(1);
  const [level, setLevel] = useState("Easy");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const { getUser } = useAuth();
  const [classLevel, setClassLevel] = useState("9");

  const handleGenerateQuiz = async () => {
    localStorage.removeItem("textAiTabQuiz");
    // props.setAiQuizGenerated(!props.aiQuizGenerated);

    if (!title || !level || !numQuestions || !language) {
      toast.info("Fields are missing!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    props.setLoading(true);

    // Define the endpoint based on the language

    let endpointURL = "http://localhost:5001/api/quiz/genrateQuizText";

    // Handle quiz generation logic

    const quizRequestData = {
      title: title,
      subject: subject,
      level: level,
      language: language,
      numberOfQuestions: numQuestions,
      questionType: questionType,
      topic: topic,
    };
    console.log(questionType);
    // console.log(quizRequestData)
    try {
      // 1. Make a POST request to the external API to generate the quiz
      const externalResponse = await fetch(endpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizRequestData),
      });
      console.log("response", externalResponse);
      // if (!externalResponse.ok) {
      //   throw new Error("Failed to generate quiz from external API");
      // }

      const quizdata = await externalResponse.json();

      const user = getUser();
      const genratedQuestions = quizdata.generatedQuestions;
      // Generate the quiz based on the type
      console.log("quiz", genratedQuestions);
      const questions = genratedQuestions.map((item) => {
        if (item.options) {
          // MCQ Question
          return {
            type: "MCQ",
            question: item.question,
            options: item.options,
            // Add an answer field if provided in the API response or set it to null for now.
            answer: item.correctAnswer || null,
          };
        } else {
          // Subjective Question
          return {
            type: "Subjective",
            question: item.question,
            answer: item.correctAnswer || null,
          };
        }
      });

      console.log(questions);
      // this data will send to backend for saving into database
      const publishedQuiz = {
        title: title,
        subject: subject,
        date: new Date().toLocaleDateString(),
        language: language,
        totalQuestions: quizdata.length,
        questions: questions,
        classLevel: classLevel,
        createdBy: user.email,
        collegeName: user.collegeName,
      };
      console.log(publishedQuiz);

      localStorage.setItem("textAiTabQuiz", JSON.stringify(questions));

      props.setAiQuizGenerated(!props.aiQuizGenerated);
      setTitle("");
      setQuestionType("MCQ");
      setNumQuestions("1");
      setLevel("easy");
      setSubject("");
      toast.success("Quiz question added successfully!", {
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
      props.setLoading(false); // Step 3: Set loading to false after the request
    }
  };
=======
import React, { useState } from 'react';
import './CreateQuiz.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../auth/AuthContext';

import axiosInstance from "../../axiosInstance"; // Import axiosInstance for API calls
function TextAiTab(props) {
    const [language, setLanguage] = useState('English');
    const [title, setTitle] = useState('');
    const [questionType, setQuestionType] = useState("Multiple Single choice");
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
      //console.log(payload);
  
      try {
        const response = await axiosInstance.post(`/quiz/genrateQuizText`, payload);
       // console.log(response.data.generatedQuestions);
        
        if (response.status !== 201) {
            throw new Error("Failed to generate quiz from external API");
        }
    
       // Example quizData with question and answer:
const quizData = response.data.generatedQuestions;
       // console.log(quizData)
        // Then you can use this data in your JSX code
        
       // console.log("Response from API:", quizData);
    
        const user = getUser();
    
        // Process the quiz data to create clearer objects
        const questions = quizData.map(item => ({
          type: item.questionType, 
          question: item.question,
          answer: item.correct_answer,
          options: item.options || [] // Default to an empty array if no options are provided
      }));


    console.log(questions);
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
        setQuestionType("Multiple Single choice");
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
  
  
    
>>>>>>> 8df0c5aaa6224b6ac7382fc8d393ecc794bd5352

  return (
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
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Biology"
          />
        </div>
        <div className="form-group">
          <label>Choose Class</label>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
          >
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter a topic or link</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Question type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="MCQ">Multiple single choice</option>
            <option value="Subjective">Subjective</option>
            <option value="MCQ+Subjective">Subjective + MCQ</option>
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
        <button
          type="button"
          onClick={handleGenerateQuiz}
          className="generate-button"
        >
          Generate
        </button>
      </form>
    </div>
<<<<<<< HEAD
  );
}
=======
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
        <option value="Multiple Single choice">Multiple single choice</option>
        <option value="Subjective">Subjective</option>
        <option value="True/False">True/False</option>
        <option value="Formula Based">Formula Based</option>
        <option value="Mixed">Mixed Questions</option>
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
>>>>>>> 8df0c5aaa6224b6ac7382fc8d393ecc794bd5352

export default TextAiTab;
