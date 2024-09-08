import React from "react";
import './Studentquiz.scss';
const StudentInCompletequiz=()=>{
    return(
        <div className="InComplete-quiz-grid">
        <div className="quiz-card">
          <h3>InCompletequiz</h3>
          <span className="badge">Biology</span>
          <p>5 questions • Published on 14/04/2024</p>
          <div className="progress-bar">
           <div className="progress" style={{ width: '30%' }}></div>
         </div>
        </div>
        <div className="quiz-card">
          <h3>Human Impact on the Environment</h3>
          <span className="badge">Biology</span>
          <p>7 questions • Published on 14/04/2024</p>
        </div>
        <div className="quiz-card">
          <h3>Type of chemical reactions</h3>
          <span className="badge">Chemistry</span>
          <p>9 questions • Published on 14/04/2024</p>
        </div>
        <div className="quiz-card">
          <h3>Intermolecular</h3>
          <span className="badge">Chemistry</span>
          <p>9 questions • Published on 14/04/2024</p>
        </div>
        <div className="quiz-card">
          <h3>Newton's laws of motion</h3>
          <span className="badge">Physics</span>
          <p>6 questions • Published on 14/04/2024</p>
        </div>
        <div className="quiz-card">
          <h3>Electromagnetic induction</h3>
          <span className="badge">Physics</span>
          <p>8 questions • Published on 14/04/2024</p>
        </div>
      </div>
    );
}

export default StudentInCompletequiz;


