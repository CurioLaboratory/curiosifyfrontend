import React, { useState, useEffect } from "react";
import './Studentquiz.scss';
import axiosInstance from '../../../axiosInstance';

const StudentActivequiz = ({ takequiz, setCompletedQuiz }) => {
  const [completeQuizzes, setCompleteQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get("/student_quiz_attendance/getcompletedquizzes"); // Fetch quizzes from the backend
        const data = response.data; // Accessing the data directly from Axios response
        setCompleteQuizzes(data); // Set the fetched quizzes to the active quizzes state
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quiz) => {
    console.log(quiz);
    takequiz('completed-quiz'); // Trigger the takequiz function with 'complete-quiz'
    setCompletedQuiz(quiz); // Pass the quiz details to setCompletedQuiz
  };

  return (
    <div className="Quiz-scrollable-container">
      <div className="Complete-quiz-grid">
        {completeQuizzes.length === 0 ? (
          <p>No quizzes available</p>
        ) : (
          completeQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="quiz-card"
              onClick={() => handleQuizClick(quiz)} // Add onClick event
            >
              <h3>{quiz.quiz.title}</h3>
              <span className="badge">{quiz.quiz.language}</span>
              <p>{quiz.questions.length} questions • Published on {quiz.quiz.date}</p>
              <span className="badge2">Score {quiz.score}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentActivequiz;
