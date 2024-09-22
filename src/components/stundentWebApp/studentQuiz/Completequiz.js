import React from "react";
import './Studentquiz.scss';


const StudentActivequiz = ({setCompletedQuizpage,takequiz}) => {

  const quizzes = [
    { title: "Human Impact on the Environment", subject: "Biology", questions: 7 },
    { title: "Type of chemical reactions", subject: "Chemistry", questions: 9 },
    { title: "Intermolecular", subject: "Chemistry", questions: 9 },
    { title: "Newton's laws of motion", subject: "Physics", questions: 6 },
    { title: "Electromagnetic induction", subject: "Physics", questions: 8 },
    { title: "Human Impact on the Environment", subject: "Biology", questions: 7 },
    { title: "Type of chemical reactions", subject: "Chemistry", questions: 9 },
    { title: "Intermolecular", subject: "Chemistry", questions: 9 },
    { title: "Newton's laws of motion", subject: "Physics", questions: 6 },
    { title: "Electromagnetic induction", subject: "Physics", questions: 8 },
  ];

  const handleQuizClick = (quiz) => {
    setCompletedQuizpage(quiz);
    takequiz('completed-quiz');
  };

  return (
    <div className="Quiz-scrollable-container">
    <div className="Complete-quiz-grid">
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-card" onClick={() => handleQuizClick(quiz)}>
          <h3>{quiz.title}</h3>
          <span className="badge">{quiz.subject}</span>
          <p>{quiz.questions} questions • Published on 14/04/2024</p>
          <span className="badge2">Score 100%</span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default StudentActivequiz;
