import React, { useState, useEffect } from 'react';
import './Quiz.scss';

const Quiz = ({ onCreateQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch request to the backend with dummy data
    setTimeout(() => {
      const dummyData = [
        { id: 1, name: 'CSE', numOfQuestions: 2, class: '-', createdOn: '02-05-2024' },
        { id: 2, name: 'Data structure and Algorithms', numOfQuestions: 5, class: '-', createdOn: '02-05-2024' },
        { id: 3, name: 'Maths Quiz - Algebra', numOfQuestions: 3, class: '12-c', createdOn: '01-05-2024' },
        { id: 4, name: 'Maths', numOfQuestions: 3, class: '-', createdOn: '02-05-2024' },
        { id: 5, name: 'Motion Design', numOfQuestions: 5, class: '-', createdOn: '02-05-2024' },
        { id: 6, name: 'Stacks and Queues', numOfQuestions: 7, class: '-', createdOn: '01-05-2024' },
        { id: 7, name: 'Test 1', numOfQuestions: 0, class: '-', createdOn: '29-05-2024' },
        { id: 8, name: 'Test 2', numOfQuestions: 0, class: '12-c', createdOn: '01-06-2024' },
        { id: 9, name: 'test', numOfQuestions: 5, class: '-', createdOn: '31-05-2024' }
      ];
      setQuizzes(dummyData);
      setLoading(false);
    }, 10); // Simulating network delay
  }, []);

  const renderNoQuizzes = () => (
    <div className="no-quizzes">
      <p>You don't have any quiz</p>
      <button className="create-quiz-button" onClick={onCreateQuiz}>+ Create new quiz</button>
    </div>
  );

  const renderQuizzes = () => (
    <div className="quizzes">
      <div className="quizzes-header">
        <h1>Quiz</h1>
        <button className="create-quiz-button" onClick={onCreateQuiz}>+ Create new quiz</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>QUIZ</th>
            <th>NO. OF QUESTIONS</th>
            <th>CLASS</th>
            <th>CREATED ON</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id}>
              <td><input type="checkbox" /></td>
              <td>{quiz.name}</td>
              <td>{quiz.numOfQuestions}</td>
              <td>{quiz.class}</td>
              <td>{quiz.createdOn}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="quiz-page">
      {quizzes.length === 0 ? renderNoQuizzes() : renderQuizzes()}
    </div>
  );
};

export default Quiz;
