import React, { useState, useEffect } from "react";
import "./Quiz.scss";
import axiosInstance from "../../axiosInstance";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { useAuth } from "../auth/AuthContext";
const Quiz = ({ onCreateQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [refreshAllQuiz, setRefreshAllQuiz] = useState(true);
  const { getUser } = useAuth();
  const renderNoQuizzes = () => (
    <div className="no-quizzes">
      <p>You don't have any quiz</p>
      <button className="create-quiz-button" onClick={onCreateQuiz}>
        + Create new quiz
      </button>
    </div>
  );
  useEffect(() => {
    const user = getUser();
    const getAllQuiz = async () => {
      const response = await axiosInstance.get("/quiz/getallquiz", {
        params: {
          userId: user.email, // pass user id as a query parameter
        },
      });
      if (response.data.length > 0) {
        // Check if quizzes are returned
        console.log(response.data[0]?.createdBy); // Safely access createdBy
        setQuizzes(response.data);
      } else {
        // console.log('No quizzes found for this user');
        setQuizzes([]); // Set quizzes to an empty array if none are found
      }
      setLoading(false);
    };

    getAllQuiz();
  }, [refreshAllQuiz]);

  // const handleCheckboxChange = (id) => {
  //   setSelectedQuizzes((prevSelectedQuizzes) =>
  //     prevSelectedQuizzes.includes(id)
  //       ? prevSelectedQuizzes.filter((quizId) => quizId !== id)
  //       : [...prevSelectedQuizzes, id]
  //   );
  // };

  const handleDelete = async (id) => {
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

  if (loading) {
    return <p>Loading...</p>;
  }
  const getFilteredAndSortedQuizzes = () => {
    let filteredQuizzes = quizzes;

    if (searchTerm) {
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedClass) {
      filteredQuizzes = filteredQuizzes.filter(
        (quiz) => quiz.classLevel.toString() === selectedClass
      );
    }

    if (sortOption) {
      filteredQuizzes.sort((a, b) => {
        if (sortOption === "date") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortOption === "questions") {
          return b.totalQuestions - a.totalQuestions;
        }
        return 0;
      });
    }

    return filteredQuizzes;
  };

  if (selectedQuiz) {
    return (
      <div className="selectedQuiz">
        <button className="back-button" onClick={() => setSelectedQuiz(null)}>
          ← Back
        </button>
        <p className="selectedQuizTitle">{selectedQuiz.title}</p>
        <p>
          Published for{" "}
          <span className="selectedQuizClass">
            Class {selectedQuiz.classLevel}
          </span>
        </p>

        <Card className="text-center cardBody">
          <Card.Body>
            {console.log(selectedQuiz)}
            {selectedQuiz.questions &&
              selectedQuiz.questions.map((question, index) => (
                <div className="cardQues" key={index}>
                  <Card.Text>
                    <h3>
                      Q{index + 1}. {question.question}
                    </h3>
                    {question.options && (
                      <>
                        {question.options.map((option, optionIndex) => (
                          <p key={optionIndex}>
                            {String.fromCharCode(65 + optionIndex)}. {option}
                          </p>
                        ))}
                      </>
                    )}
                    {question.type === "Subjective" && (
                      <p>
                        <strong>Answer:</strong> {question.answer}
                      </p>
                    )}
                  </Card.Text>
                </div>
              ))}
          </Card.Body>
        </Card>
      </div>
    );
  }
  return (
    <div className="quiz-page">
      {quizzes.length === 0 ? (
        renderNoQuizzes()
      ) : (
        <div className="quizzes">
          <div className="quizzes-header">
            <h1>Quiz</h1>
            <button className="create-quiz-button" onClick={onCreateQuiz}>
              + Create new quiz
            </button>
          </div>
          <div className="quizzes-controls">
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
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
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
              {getFilteredAndSortedQuizzes().map((quiz, quizIndex) => (
                <tr
                  key={quizIndex}
                  onClick={() => handleQuizClick(quiz)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{quiz.title}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.classLevel}</td>
                  <td>{quiz.date}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <img
                      className="event-delete-button"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(quiz._id)}
                      src="/icons/dustbin.png"
                      alt="Quiz"
                    />
                  </td>
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
