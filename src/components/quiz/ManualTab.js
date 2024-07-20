import React, { useState, useEffect } from 'react';

function QuizForm(props) {
    const [language, setLanguage] = useState('English');
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [classLevel, setClassLevel] = useState('9');
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [existingTitle, setExistingTitle] = useState('');

    useEffect(() => {
        if (answer === '' && options[0] !== '') {
            setAnswer(options[0]);
        }
        // Load total questions count and existing title from localStorage
        const existingQuizData = JSON.parse(localStorage.getItem('manualQuizData')) || [];
        setTotalQuestions(existingQuizData.length);
        if (existingQuizData.length > 0) {
            setExistingTitle(existingQuizData[0].title);
            setTitle(existingQuizData[0].title);
        }
    }, [options, answer]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleGenerateQuiz = () => {
        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }

        const quizItem = {
            language,
            title: existingTitle || title,
            question,
            options,
            answer,
            classLevel,
            totalQuestions,
            date: formatDate(new Date())
        };

        const existingQuizData = JSON.parse(localStorage.getItem('manualQuizData')) || [];
        const updatedQuizData = [...existingQuizData, quizItem];
        localStorage.setItem('manualQuizData', JSON.stringify(updatedQuizData));
        props.setRefreshLocalQuiz(!props.refreshLocalQuiz);

        setLanguage('English');
        setQuestion('');
        setOptions(['', '', '', '']);
        setAnswer('');
        setClassLevel('9');
        setTotalQuestions(updatedQuizData.length);

        if (!existingTitle) {
            setExistingTitle(title);
        }

        alert('Quiz question added successfully!');
    };

    return (
        <div className="form-container">
            <h2>Total Questions: {totalQuestions}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Choose Language</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Choose Class</label>
                    <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)}>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Enter a title</label>
                    <input
                        type="text"
                        value={existingTitle || title}
                        onChange={(e) => !existingTitle && setTitle(e.target.value)}
                        disabled={!!existingTitle}
                    />
                </div>
                <div className="form-group">
                    <label>Enter your question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter your question here"
                    />
                </div>
                {['A', 'B', 'C', 'D'].map((letter, index) => (
                    <div className="form-group" key={index}>
                        <label>Option {letter}</label>
                        <input
                            type="text"
                            value={options[index]}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div className="form-group">
                    <label>Answer</label>
                    <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                Option {String.fromCharCode(65 + index)}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={handleGenerateQuiz}
                    className="generate-button"
                >
                    Add Question
                </button>
            </form>
        </div>
    );
}

export default QuizForm;