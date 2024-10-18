import React, { useState, useEffect } from "react";
import './Studentquiz.scss';
import axiosInstance from '../../../axiosInstance';

const StudentInCompletequiz = () => {
  const [incompleteQuizzes, setIncompleteQuizzes] = useState([]);

  useEffect(() => {
    const fetchIncompleteQuizzes = async () => {
      try {
        const response = await axiosInstance.get("/student_quiz_attendance/getincompletequizzes"); // Fetch incomplete quizzes from the backend
        const data = response.data; // Accessing the data directly from Axios response
        setIncompleteQuizzes(data); // Set the fetched incomplete quizzes to the state
      } catch (error) {
        console.error('Error fetching incomplete quizzes:', error);
      }
    };

    fetchIncompleteQuizzes();
  }, []);

  return (
    <div className="Quiz-scrollable-container">
      <div className="InComplete-quiz-grid">
        {incompleteQuizzes.length === 0 ? (
          <p>No incomplete quizzes available</p>
        ) : (
          incompleteQuizzes.map((quiz, index) => (
            <div key={index} className="quiz-card">
              <h3>{quiz.quizId.title}</h3>
              <span className="badge">{quiz.quizId.subject}</span>
              <p>{quiz.quizId.questions.length} questions • Published on {quiz.quizId.date}</p>
              {quiz.progress > 0 && (
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${quiz.progress}%` }}></div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentInCompletequiz;
