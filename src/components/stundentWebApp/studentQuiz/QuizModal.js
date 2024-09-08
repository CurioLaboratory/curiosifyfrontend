import React from 'react';
import './QuizModal.scss';

const QuizModal = ({ show, onClose, quiz,takequiz }) => {
  if (!show) return null;

  const handleTakeQuiz = () => {
   takequiz('take-quiz');
    onClose();
     
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{quiz.title}</h2>
        <p>You have {quiz.questions} questions, test your knowledge on {quiz.title}</p>
        <div className="btn-div">
        <button className="take-quiz-button" onClick={handleTakeQuiz}>Take Quiz</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
