import React, { useState, useEffect } from 'react';
import './Quiz.scss';
import axiosInstance from "../../axiosInstance";
import Table from 'react-bootstrap/Table';

const Quiz = ({ onCreateQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [refreshAllQuiz, setRefreshAllQuiz] = useState(true);

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
      const response = await axiosInstance.get("/quiz/getallquiz");
      setQuizzes(response.data);
      // console.log(response.data);
      setLoading(false);
    };

    getAllQuiz();
  }, [refreshAllQuiz]);

  const handleCheckboxChange = (id) => {
    setSelectedQuizzes((prevSelectedQuizzes) =>
      prevSelectedQuizzes.includes(id)
        ? prevSelectedQuizzes.filter((quizId) => quizId !== id)
        : [...prevSelectedQuizzes, id]
    );
  };

  const handleDelete = async (id) => {
    // setQuizzes((prevQuizzes) =>
    //   prevQuizzes.filter((quiz) => !selectedQuizzes.includes(quiz.id))
    // );
    // setSelectedQuizzes([]);
    const response = await axiosInstance.delete(`/quiz/deletequiz/${id}`);

    if (response.status === 200) {
      window.alert("Quiz deleted successfully!");
      setRefreshAllQuiz(!refreshAllQuiz);
    } else {
      console.log(response);
    }
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Quiz</th>
                <th>No. of Questions</th>
                <th>Class</th>
                <th>Created On</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, quizIndex) => (
                <tr key={quizIndex}>
                  <td>{quiz.title}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.classLevel}</td>
                  <td>{quiz.date}</td>
                  <td>
                    <img className="event-delete-button" style={{ cursor: "pointer" }} onClick={() => handleDelete(quiz._id)} src="/icons/dustbin.png" alt="Quiz" />
                  </td>
                  {/* <h2>{quiz.title}</h2>
                    <p>Language: {quiz.language}</p>
                    <p>Class: {quiz.class}</p>
                    <p>Date Published: {quiz.date}</p>
                    <p>Total Questions: {quiz.totalQuestions}</p> */}
                  {/* <div className="questions-container">
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
                    </div> */}

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Quiz;
