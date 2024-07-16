import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../auth/AuthContext';

const RightTab = (props) => {
    const [quizData, setQuizData] = useState([]);

    const { getUser } = useAuth();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('manualQuizData')) || [];
        setQuizData(data);
    }, [props.refreshLocalQuiz]);

    const handlePublish = async () => {
        if (quizData.length === 0) {
            alert('No questions to publish!');
            return;
        }
        // console.log(quizData[0]);
        const user = getUser();
        const publishedQuiz = {
            title: quizData[0].title,
            date: new Date().toLocaleDateString(),
            classLevel: quizData[0].classLevel,
            language: quizData[0].language,
            totalQuestions: quizData.length,
            questions: quizData.map(item => ({
                question: item.question,
                options: item.options,
                answer: item.answer
            })),
            createdBy: user.email
        };

        const response = await axiosInstance.post("/quiz/createmanualquiz", publishedQuiz); 

        if (response.status === 201) {
            alert('Quiz published successfully!');
            localStorage.removeItem('manualQuizData');
            setQuizData([]);
        }

        if (response.status === 203) {
            alert(response.data.message);
        }
        // const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        // const updatedQuizzes = [...existingQuizzes, publishedQuiz];
        // localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));

        // Clear manualQuizData from localStorage

        // Clear the displayed quiz data

    };

    if (quizData.length === 0) {
        return <div>No quiz data available.</div>;
    }

    return (
        <>
            <div className='right-header'>
                <button type="button" className="publish-button" onClick={handlePublish}>
                    Publish
                </button>
            </div>
            <div className="quiz-data-display">
                <h1>{quizData[0].title}</h1>
                <p>Language: {quizData[0].language}</p>
                <p>Class: {quizData[0].classLevel}</p>
                <p>Total Questions: {quizData.length}</p>
                {quizData.map((item, index) => (
                    <div key={index} className="quiz-question">
                        <h3>Question {index + 1}</h3>
                        <p>{item.question}</p>
                        <ul>
                            {item.options.map((option, optionIndex) => (
                                <li key={optionIndex} style={{ color: option === item.answer ? 'green' : 'black' }}>
                                    {String.fromCharCode(65 + optionIndex)}: {option}
                                </li>
                            ))}
                        </ul>
                        <p>Correct Answer: {item.answer}</p>
                        <p>Date Added: {item.date}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RightTab