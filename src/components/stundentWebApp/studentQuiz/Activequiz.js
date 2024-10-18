import React, { useState, useEffect } from "react";
import './Studentquiz.scss';
import QuizModal from './QuizModal';
import axiosInstance from '../../../axiosInstance';  // Make sure this is the right path


const StudentActivequiz = ({ takequiz,setSelectedQuiz}) => {
    const [showModal, setShowModal] = useState(false);
    const [activeQuizzes, setActiveQuizzes] = useState([]);
    const [quizcard, setQuizcard] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            // Get classLevel from local storage
            const user = JSON.parse(localStorage.getItem("user")); // Assuming user object is stored in local storage
            const classLevel = user?.classLevel; // Get classLevel from the user object
            const collegeName = user?.collegeName; // Get collegeName from the user object
    
            try {
                // Make the GET request with classLevel and collegeName as a query parameter
                const response = await axiosInstance.get(`/student_quiz_attendance/getactivequizzes`, {
                    params: {
                      classLevel: classLevel,
                      collegeName: collegeName
                    }
                  });
                  
                
                const data = response.data; // Accessing the data from Axios response
                setActiveQuizzes(data); // Set the fetched quizzes to the active quizzes state
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
    
        fetchQuizzes(); // Fetch quizzes on component mount
    }, []);
    
    const handleQuizClick = (quiz) => {
      setSelectedQuiz(quiz);
        setQuizcard(quiz);
        setShowModal(true); // Open the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        
    };



    return (
        <div className="Quiz-scrollable-container">
            <div className="Active-quiz-grid">
                {activeQuizzes.length === 0 ? (
                    <p>No quizzes available</p>
                ) : (
                    activeQuizzes.map((quiz, index) => (
                        <div key={index} className="quiz-card" onClick={() => handleQuizClick(quiz)}>
                            <h3>{quiz.title}</h3>
                            <span className="badge">{quiz.language}</span>
                            <p>{quiz.questions.length} questions • Published on {quiz.date}</p>
                        </div>
                    ))
                )}
            </div>

            {showModal && quizcard && (
                <QuizModal
                    show={showModal}
                    onClose={handleCloseModal}
                    takequiz={takequiz}
                    quiz={quizcard}
                />
            )}
        </div>
    );
};

export default StudentActivequiz;
