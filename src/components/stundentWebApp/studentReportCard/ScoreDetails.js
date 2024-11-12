import React from 'react';


const ScoreDetails = ({ score }) => {
  return (
    <div className="score-details card">
      <h3>Final Score</h3>
      <div className="score-container">
        <div className="score-circle">
          <span className="percentage">{score.percentage}%</span>
        </div>
        <div className="grade-info">
          <span className="grade">{score.grade}</span>
          <p>Final grade based on academic subjects as well as activities and conducts</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDetails;
