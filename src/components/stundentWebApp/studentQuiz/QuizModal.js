import React from 'react';
import './QuizModal.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const QuizModal = ({ show, onClose,takequiz,quiz }) => {
  const navigate = useNavigate(); // Initialize navigation

  if (!show) return null;

  const handleTakeQuiz = () => {
    // Make sure to set the selected quiz 
    takequiz('take-quiz'); // Transition to the quiz-taking page
    onClose(); // Close the modal after selecting the quiz
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{quiz.title}</h2>
        <p>You have {quiz.questions.length} questions, test your knowledge on {quiz.title}</p>
        <div className="btn-div">
          <button className="take-quiz-button" onClick={handleTakeQuiz}>Take Quiz</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
