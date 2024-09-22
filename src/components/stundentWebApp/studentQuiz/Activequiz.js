import React, { useState } from "react";
import './Studentquiz.scss';
import QuizModal from './QuizModal';

const StudentActivequiz = ({takequiz}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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
    { title: "Human Impact on the Environment", subject: "Biology", questions: 7 },
    { title: "Type of chemical reactions", subject: "Chemistry", questions: 9 },
    { title: "Intermolecular", subject: "Chemistry", questions: 9 },
    { title: "Newton's laws of motion", subject: "Physics", questions: 6 },
    { title: "Electromagnetic induction", subject: "Physics", questions: 8 },
  ];

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuiz(null);
  };

  return (
    <div className="Quiz-scrollable-container">
    <div className="Active-quiz-grid">
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-card" onClick={() => handleQuizClick(quiz)}>
          <h3>{quiz.title}</h3>
          <span className="badge">{quiz.subject}</span>
          <p>{quiz.questions} questions • Published on 14/04/2024</p>
        </div>
      ))}
      <QuizModal show={showModal} onClose={handleCloseModal} quiz={selectedQuiz} takequiz={takequiz} />
    </div>
    </div>
  );
};

export default StudentActivequiz;
