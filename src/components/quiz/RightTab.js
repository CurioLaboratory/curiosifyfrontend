import React, { useState, useEffect } from 'react'

const RightTab = () => {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('manualQuizData')) || [];
        setQuizData(data);
    }, []);

    const handlePublish = () => {
        if (quizData.length === 0) {
            alert('No questions to publish!');
            return;
        }

        const publishedQuiz = {
            title: quizData[0].title,
            date: new Date().toLocaleDateString(),
            class: quizData[0].classLevel,
            language: quizData[0].language,
            totalQuestions: quizData.length,
            questions: quizData.map(item => ({
                question: item.question,
                options: item.options,
                answer: item.answer
            }))
        };

        const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        const updatedQuizzes = [...existingQuizzes, publishedQuiz];
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));

        // Clear manualQuizData from localStorage
        localStorage.removeItem('manualQuizData');

        // Clear the displayed quiz data
        setQuizData([]);

        alert('Quiz published successfully!');
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