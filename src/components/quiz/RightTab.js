import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../auth/AuthContext';
import Card from 'react-bootstrap/Card';
import './Righttab.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RightTab = (props) => {
    const [quizData, setQuizData] = useState([]);

    const { getUser } = useAuth();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('manualQuizData')) || [];
        setQuizData(data);
    }, [props.refreshLocalQuiz]);

    const handleReset = async () => {
        toast.success("Quiz Reset successfully!", {
            position: "top-right",
            autoClose: 1000
        });
        // alert('Quiz Reset successfully!');
        localStorage.removeItem('manualQuizData');
        setQuizData([]);
    }

    const handlePublish = async () => {
        if (quizData.length === 0) {
            toast.info("No questions to publish!", {
                position: "top-right",
                autoClose: 1000
            });
            // alert('No questions to publish!');
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
          console.log(publishedQuiz);
        const response = await axiosInstance.post("/quiz/createmanualquiz", publishedQuiz);

        if (response.status === 201) {
            toast.success("Quiz published successfully!", {
                position: "top-right",
                autoClose: 1000
            });
            // alert('Quiz published successfully!');
            localStorage.removeItem('manualQuizData');
            setQuizData([]);
        }

        if (response.status === 203) {
            alert(response.data.message);
        }
    };

    if (quizData.length === 0) {
        return <div>No quiz data available.</div>;
    }

    return (
        <>
            <div className='top'>
                <div>
                    <button type="button" className="reset-button" onClick={handleReset}>
                        Reset
                    </button>
                </div>
                <h3> Review your Quiz</h3>
                <div >
                    <button type="button" className="publish-button" onClick={handlePublish}>
                        Publish
                    </button>
                </div>
            </div>
            <div className="quiz-data-display">
                <Card className="text-center cardBody">
                    <Card.Body>
                        <Card.Title className='cardTitle '>
                            {/* <h1>Title : {quizData[0].title}</h1> */}
                        </Card.Title>
                        <Card.Text >
                            {quizData.map((item, index) => (
                                <div key={index} className='cardQues'>
                                    <h3>{index + 1}. {item.question} </h3>
                                    <ul>
                                        {item.options.map((option, optionIndex) => (
                                            <li key={optionIndex} style={{ color: option === item.answer ? 'green' : 'black' }}>
                                                {String.fromCharCode(65 + optionIndex)}: {option}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Correct Answer: {item.answer}</p>
                                    <p>Created on: {item.date}</p>
                                </div>
                            ))}
                        </Card.Text>

                    </Card.Body>
                </Card>
                <ToastContainer />
            </div>
        </>
    )
}

export default RightTab