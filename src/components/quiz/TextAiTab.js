import React, { useState } from 'react';
import './CreateQuiz.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../auth/AuthContext';


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
     // props.setAiQuizGenerated(!props.aiQuizGenerated);

      if(!title || !level || !numQuestions  || !language){
        toast.info("Fields are missing!", {
          position: "top-right",
          autoClose: 1000,
        });
        return;
      }
      props.setLoading(true);

      // Define the endpoint based on the language
  let endpointURL;
  if (language.toLowerCase() === "english") {
    endpointURL = "https://nsyqsyo2bm6csijtfl4cl5cjvu0annrl.lambda-url.us-east-1.on.aws/";
  } else {
    endpointURL = "https://bhghddzlvw7366bldu3vpzmj4u0dordd.lambda-url.us-east-1.on.aws/";
  }
      // Handle quiz generation logic

      const quizRequestData = {
        subject: subject+" "+title,
        ton: level,
        numQuestions: numQuestions,
        questionType: questionType,
        youtubeURL: topic,
        ...(language.toLowerCase() !== "english" && { language: language }), // Conditionally add language
      };
    console.log(questionType)
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
    
        if (!externalResponse.ok) {
          throw new Error("Failed to generate quiz from external API");
        }
    
        const quizdata = await externalResponse.json();
       console.log(quizdata)
  
        const user = getUser();

        // Generate the quiz based on the type
        const questions = quizdata.map((item) => {
          if (item.option1) {
              // MCQ Question
              return {
                type: "MCQ",
                question: item.question,
                options: [item.option1, item.option2, item.option3, item.option4],
                answer: item[item.correctOption.toLowerCase()] 
            };
          } else if (item.correctAnswer) {
              // Subjective Question
              return {
                  type: "Subjective",
                  question: item.Question,
                  answer: item.correctAnswer,
              };
          }
      });
console.log(questions)
        // this data will send to backend for saving into database
        const publishedQuiz = {
          title: title,
          subject: subject,
          date: new Date().toLocaleDateString(),
          language: language,
          totalQuestions: quizdata.length,
          questions: questions,
          classLevel:classLevel,
          createdBy: user.email,
          collegeName:user.collegeName
      };
      console.log(publishedQuiz)
  
      
      localStorage.setItem('textAiTabQuiz', JSON.stringify(publishedQuiz));

      props.setAiQuizGenerated(!props.aiQuizGenerated);
      setTitle('')
      setQuestionType("MCQ")
      setNumQuestions('1')
      setLevel('easy')
      setSubject('')
      toast.success("Quiz question added successfully!", {
          position: "top-right",
          autoClose: 1000
      });
  
      } catch (error) {
        toast.error("Error Fetching, try again!", {
          position: "top-right",
          autoClose: 1000,
        });
        console.error("Error:", error.message);
      }
      finally {
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
