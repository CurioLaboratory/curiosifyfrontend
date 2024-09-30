import React, { useState } from 'react';
import './Quizpage.scss';
import axiosInstance from '../../../axiosInstance'
const QuizPage = ({ setCurrentPage, selectedQuiz}) => {
    const [userAnswers, setUserAnswers] = useState(selectedQuiz ? Array(selectedQuiz.questions.length).fill(null) : []);
    const handleOptionChange = (questionIndex, selectedOption) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = selectedOption;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        // Calculate score based on userAnswers
        let calculatedScore = 0;

        // Check each answer
        selectedQuiz.questions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                calculatedScore += 1; // Increment score for correct answer
            }
        });
      
        // Calculate percentage
        const totalQuestions = selectedQuiz.questions.length;
        const percentageScore = (calculatedScore / totalQuestions) * 100;
       
       // setScore(percentageScore);

        const completedQuiz = {
            quizId: selectedQuiz._id,
            score: percentageScore,
            questions: selectedQuiz.questions,
            userAnswers, // Store user answers
        };
        const fetchQuizzes = async () => {
            try {
                const response = await axiosInstance.post("/student_quiz_attendance/submitquiz",completedQuiz); // Fetch quizzes from the backend
                console.log(response);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
      
        fetchQuizzes();
       setCurrentPage('Studentquiz');
    };

    // Early return if selectedQuiz is null or loading
    if (!selectedQuiz) {
        return <div>Loading...</div>; // or a loading spinner/message
    }

    return (
    
        <div className="take-quiz-page">
            <div className="quiz-head">
                <h1>Take your quiz</h1>
                <button className="submit-quiz-btn" onClick={handleSubmit}>Submit Quiz</button>
            </div>
            
            <h2>{selectedQuiz.title}</h2>
            <p>{selectedQuiz.questions.length} questions</p>

            {selectedQuiz.questions.map((question, index) => (
                <div key={question._id} className="quiz-question">
                    <p>{index + 1}. {question.question}</p>
                    {question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                            <input 
                                type="radio" 
                                name={`q${index}`} 
                                checked={userAnswers[index] === option} 
                                onChange={() => handleOptionChange(index, option)} 
                            /> {option}
                        </label>
                    ))}
                </div>
            ))}

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
