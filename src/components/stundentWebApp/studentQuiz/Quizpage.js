import React from 'react';
import './Quizpage.scss'; // Add appropriate styling here

const QuizPage = () => {
  return (
    <div className="take-quiz-page">
        <div className="quiz-head">
      <h1>Take your quiz</h1>
      <button className="submit-quiz-btn">Submit Quiz</button>
      </div>
      <h2>Evolution</h2>
      <p>5 questions</p>

      <div className="quiz-question">
        <p>1. Which of the following is an example of evolution?</p>
        <label><input type="radio" name="q1" /> A deer growing antlers as it matures</label>
        <label><input type="radio" name="q1" /> A bird learning to sing a new song</label>
        <label><input type="radio" name="q1" /> A fish changing colors to blend in with its surroundings</label>
        <label><input type="radio" name="q1" /> A snake shedding its skin</label>
      </div>

      <div className="quiz-question">
        <p>2. During cellular respiration in plants, oxygen is consumed and carbon dioxide is released.</p>
        <label><input type="radio" name="q2" /> True</label>
        <label><input type="radio" name="q2" /> False</label>
      </div>

      <div className="quiz-question">
        <p>3. What term describes the process by which unrelated species evolve similar traits due to similar environmental pressures? (200 words)</p>
        <textarea placeholder="Type your answer"></textarea>
        <p>Or</p>
        <button className="upload-btn">Upload a document</button>
      </div>

      
    </div>
  );
};

export default QuizPage;
