import React from 'react';
import './Quizpage.scss'; // Add appropriate styling here

const SubmittedQuizPage = ({completedQuizpage}) => {
  
  return (
    <div className="Submitted-quiz-page">
      <h2>Your total score: 70%</h2>
      <h2>Evolution</h2>
      <p>5 questions</p>

      <div className="quiz-question">
        <p>1. Which of the following is an example of evolution?</p>
        <label className="correct"><input type="radio" name="q1" checked disabled /> A deer growing antlers as it matures</label>
        <label><input type="radio" name="q1" disabled /> A bird learning to sing a new song</label>
        <label><input type="radio" name="q1" disabled /> A fish changing colors to blend in with its surroundings</label>
        <label><input type="radio" name="q1" disabled /> A snake shedding its skin</label>
        <p className="points">1/1 points</p>
      </div>

      <div className="quiz-question">
        <p>2. During cellular respiration in plants, oxygen is consumed and carbon dioxide is released.</p>
        <label className="incorrect"><input type="radio" name="q2" checked disabled /> True</label>
        <label className="correct"><input type="radio" name="q2" disabled /> False</label>
        <p className="points">0/1 points</p>
      </div>

      <div className="quiz-question">
        <p>3. What term describes the process by which unrelated species evolve similar traits due to similar environmental pressures?</p>
        <textarea placeholder="Type your answer" value="File name.pdf" disabled></textarea>
        <p className="points">1/1 points</p>
      </div>

     
        <button className="close-quiz-btn">Close Quiz</button>
     
    </div>
  );
};

export default SubmittedQuizPage;
