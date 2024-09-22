import React, {  useState } from 'react';
import './Studentquiz.scss';
import StudentActivequiz from "./Activequiz";
import StudentCompletequiz from "./Completequiz";
import StudentInCompletequiz from './InCompletequiz';
const Studentquiz=({takequiz,setCompletedQuizpage})=>{
    const [currentPage, setCurrentPage] = useState('Activequiz');
    const renderContent = () => {
        switch (currentPage) {
          case 'Activequiz':
          return <StudentActivequiz takequiz={takequiz} />;
          case 'Completequiz':
            return <StudentCompletequiz takequiz={takequiz} setCompletedQuizpage={setCompletedQuizpage}/>;
          case 'InCompletequiz':
            return <StudentInCompletequiz/>;  
          default:
            return <div className="content"><h1>Content Not Found</h1></div>;
        }
      };


return(
    <div className="Student-quizz-container">
      <h1>Quiz</h1>
      <div className="tabs">
        <div className={currentPage === 'Activequiz' ? 'tab active' : 'tab'} onClick={() => {setCurrentPage('Activequiz')}}>Active Quizzes</div>
        <div className={currentPage === 'Completequiz' ? 'tab active' : 'tab'} onClick={() => {setCurrentPage('Completequiz')}}>Completed Quizzes</div>
        <div className={currentPage === 'InCompletequiz' ? 'tab active' : 'tab'} onClick={() => {setCurrentPage('InCompletequiz')}}>Incomplete Quizzes</div>
      </div>
      { renderContent()}
    </div>
);
}

export default Studentquiz;