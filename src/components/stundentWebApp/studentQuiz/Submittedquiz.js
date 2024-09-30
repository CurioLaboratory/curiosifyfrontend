import React from 'react';
import './Quizpage.scss'; 

const SubmittedQuizPage = ({ completedQuiz }) => {
  if (!completedQuiz) {
    return <p>No quiz submitted yet.</p>;
  }

  const getOptionClass = (userAnswer, correctAnswer, option) => {
    if (userAnswer === option && userAnswer === correctAnswer) {
      return 'correct-answer'; // Green background for correct answer
    }
    if (userAnswer === option && userAnswer !== correctAnswer) {
      return 'wrong-answer'; // Red background for wrong answer
    }
    if (option === correctAnswer) {
      return 'correct-answer'; // Green background for the correct answer if the user was wrong
    }
    return ''; // Default style for other options
  };

  return (
    <div className="SubmittedQuizdiv">
    <div className="submitted-quiz-page">
      <h2>Submitted Quiz</h2>
      <h3>{completedQuiz.quiz.title}</h3>
      <p>Score: {completedQuiz.score}%</p>
      <p>Total Questions: {completedQuiz.questions.length}</p>

      {completedQuiz.questions.map((question, index) => (
        <div key={question._id} className="submitted-quiz-question">
          <p>{index + 1}. {question.question}</p>
          <div className="options-container">
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`option ${getOptionClass(completedQuiz.userAnswers[index], question.answer, option)}`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SubmittedQuizPage;
