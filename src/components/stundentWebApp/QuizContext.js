import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [completedQuiz, setCompletedQuiz] = useState(null);
    return (
        <QuizContext.Provider value={{ selectedQuiz, setSelectedQuiz, completedQuiz, setCompletedQuiz}}>
            {children}
        </QuizContext.Provider>
    );
};
