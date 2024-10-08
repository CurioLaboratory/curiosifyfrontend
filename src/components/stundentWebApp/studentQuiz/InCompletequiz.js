import React from "react";
import './Studentquiz.scss';

const StudentInCompletequiz = () => {

  const incompleteQuizzes = [
    { title: "InCompletequiz", subject: "Biology", questions: 5, progress: 30 },
    { title: "Human Impact on the Environment", subject: "Biology", questions: 7, progress: 0 },
    { title: "Type of chemical reactions", subject: "Chemistry", questions: 9, progress: 0 },
    { title: "Intermolecular", subject: "Chemistry", questions: 9, progress: 0 },
    { title: "Newton's laws of motion", subject: "Physics", questions: 6, progress: 0 },
    { title: "Electromagnetic induction", subject: "Physics", questions: 8, progress: 0 },
    { title: "InCompletequiz", subject: "Biology", questions: 5, progress: 30 },
    { title: "Human Impact on the Environment", subject: "Biology", questions: 7, progress: 0 },
    { title: "Type of chemical reactions", subject: "Chemistry", questions: 9, progress: 0 },
    { title: "Intermolecular", subject: "Chemistry", questions: 9, progress: 0 },
    { title: "Newton's laws of motion", subject: "Physics", questions: 6, progress: 0 },
    { title: "Electromagnetic induction", subject: "Physics", questions: 8, progress: 0 },
  ];

  return (
    <div className="Quiz-scrollable-container">
      <div className="InComplete-quiz-grid">
        {incompleteQuizzes.map((quiz, index) => (
          <div key={index} className="quiz-card">
            <h3>{quiz.title}</h3>
            <span className="badge">{quiz.subject}</span>
            <p>{quiz.questions} questions • Published on 14/04/2024</p>
            {quiz.progress > 0 && (
              <div className="progress-bar">
                <div className="progress" style={{ width: `${quiz.progress}%` }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentInCompletequiz;
