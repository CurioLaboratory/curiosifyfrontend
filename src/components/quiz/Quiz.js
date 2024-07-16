import React, { useState, useEffect } from 'react';
import './Quiz.scss';
import axiosInstance from "../../axiosInstance";

const Quiz = ({ onCreateQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const renderNoQuizzes = () => (
    <div className="no-quizzes">
      <p>You don't have any quiz</p>
      <button className="create-quiz-button" onClick={onCreateQuiz}>+ Create new quiz</button>
    </div>
  );
  useEffect(() => {
    // Simulating a fetch request to the backend with dummy data
    // setTimeout(() => {
    //   const dummyData = [
    //     { id: 1, name: 'Evolution', numOfQuestions: 2, class: 12, createdOn: '01-03-2024' },
    //     { id: 2, name: 'Laws of motion', numOfQuestions: 1, class: 11, createdOn: '01-03-2024' },
    //   ];
    //   const data = localStorage.getItem('quizzes');
    //   // console.log(data)
    //   setQuizzes(data);

    //   setLoading(false);
    // }, 10); // Simulating network delay
    const getAllQuiz = async () => {
      const allQuiz = await axiosInstance.get("/quiz/getallquiz");
      setQuizzes(allQuiz);
      setLoading(false);
    };

    getAllQuiz();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedQuizzes((prevSelectedQuizzes) =>
      prevSelectedQuizzes.includes(id)
        ? prevSelectedQuizzes.filter((quizId) => quizId !== id)
        : [...prevSelectedQuizzes, id]
    );
  };

  const handleDelete = () => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => !selectedQuizzes.includes(quiz.id))
    );
    setSelectedQuizzes([]);
  };

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // const filteredQuizzes = quizzes
  //   .filter((quiz) =>
  //     quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .filter((quiz) =>
  //     selectedClass ? quiz.class === parseInt(selectedClass) : true
  //   )
  //   .sort((a, b) => {
  //     if (sortOption === 'date') {
  //       return new Date(a.createdOn) - new Date(b.createdOn);
  //     } else if (sortOption === 'questions') {
  //       return b.numOfQuestions - a.numOfQuestions;
  //     }
  //     return 0;
  //   });
  // console.log("Quiz ==>", quizzes);
  if (loading) {
    return <p>Loading...</p>;
  }

  // if (selectedQuiz) {
  //   return (
  //     <div className="quiz-detail">
  //       <button className="back-button" onClick={() => setSelectedQuiz(null)}>Back</button>
  //       <h1>{selectedQuiz.name}</h1>
  //       <h2>Published for Class {selectedQuiz.class}</h2>
  //       <div>
  //         <h3>1. Which of the following is an example of evolution?</h3>
  //         <p>A deer growing antlers as it matures</p>
  //         <p>A bird learning to sing a new song</p>
  //         <p>A fish changing colors to blend in with its surroundings</p>
  //         <p>A snake shedding its skin</p>
  //       </div>
  //       <div>
  //         <h3>2. What is the term for process which species evolve similar traits due to shared environmental pressures?</h3>
  //         <p>Convergent evolution</p>
  //         <p>Divergent evolution</p>
  //         <p>Co-evolution</p>
  //         <p>Adaptive radiation</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="quiz-page">
      {quizzes.length === 0 ? (
        renderNoQuizzes()
      ) : (
        <div className="quizzes">
          <div className="quizzes-header">
            <h1>Quiz</h1>
            <button className="create-quiz-button" onClick={onCreateQuiz}>+ Create new quiz</button>
          </div>
          {/* <div className="quizzes-controls">
          <input
              type="text"
              className="search-bar"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filters">
              <select
                className="filter-by-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Filter by Class</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
              <select
                className="sort-by"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="date">Date</option>
                <option value="questions">Number of Questions</option>
              </select>
            </div>

          </div> */}
          <div className="deleteRow">
            <button className="delete-quiz-button" >Delete Quiz</button>
          </div>
          {/* <div className="deleteRow">
            <button className="delete-quiz-button" onClick={handleDelete} disabled={selectedQuizzes.length === 0}>Delete Quiz</button>
          </div> */}
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
                

                
              {/* {filteredQuizzes.map((quiz) => (
                <tr key={quiz.id} onClick={() => handleQuizClick(quiz)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedQuizzes.includes(quiz.id)}
                      onChange={() => handleCheckboxChange(quiz.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td>{quiz.name}</td>
                  <td>{quiz.numOfQuestions}</td>
                  <td>{quiz.class}</td>
                  <td>{quiz.createdOn}</td>
                  <td>...</td>
                </tr>
              ))} */}
                {/* {quizzes.map((quiz, quizIndex) => (
                  <div key={quizIndex} className="quiz-container">
                    <h2>{quiz.title}</h2>
                    <p>Language: {quiz.language}</p>
                    <p>Class: {quiz.class}</p>
                    <p>Date Published: {quiz.date}</p>
                    <p>Total Questions: {quiz.totalQuestions}</p>
                    <div className="questions-container">
                      {quiz.questions.map((item, questionIndex) => (
                        <div key={questionIndex} className="quiz-question">
                          <h3>Question {questionIndex + 1}</h3>
                          <p>{item.question}</p>
                          <ul>
                            {item.options.map((option, optionIndex) => (
                              <li key={optionIndex} style={{ color: option === item.answer ? 'green' : 'black' }}>
                                {String.fromCharCode(65 + optionIndex)}: {option}
                              </li>
                            ))}
                          </ul>
                          <p>Correct Answer: {item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))} */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Quiz;
