import React, { useState, useEffect } from "react";
// import './Quiz.scss';
import axiosInstance from "../../axiosInstance";

const FlashCard = ({ onCreateFlashCards }) => {
    const [flashCards, setflashCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedflashCards, setSelectedflashCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [selectedflashCard, setSelectedflashCard] = useState(null);
    const renderNoflashCards = () => (
        <div className="no-quizzes">
            <p>You don't have any flashcards</p>
            <button className="create-quiz-button" onClick={onCreateFlashCards}>
                + Create new flashcard
            </button>
        </div>
    );

    // useEffect(() => {
    //     // Simulating a fetch request to the backend with dummy data
    //     setTimeout(() => {
    //         const dummyData = [
    //             { id: 1, name: 'Evolution', numOfCards: 2, tags: [], createdAt: '01-03-2024', lastAttempted: "01-03-2024", lastAttemptedScore: "100%"},
    //             // { id: 2, name: 'Laws of motion', numberOfQuestions: 1, class: 11, createdOn: '01-03-2024' },
    //         ];
    //         setflashCards(dummyData);
    //         setLoading(false);
    //     }, 10); // Simulating network delay
    // }, []);

    useEffect(() => {
        const fetchFlashcards = async () => {
            const response = await axiosInstance.get(
                "/flashcard/getAllFlashcards"
            );

            // console.log(response)
            if (response.status === 200) {
                setflashCards(response.data.flashcards);
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedflashCards((prevSelectedflashCards) =>
            prevSelectedflashCards.includes(id)
                ? prevSelectedflashCards.filter((fcId) => fcId !== id)
                : [...prevSelectedflashCards, id]
        );
    };

    const handleDelete = () => {
        setflashCards((prevflashCards) =>
            prevflashCards.filter(
                (flashCard) => !selectedflashCards.includes(flashCard.id)
            )
        );
        setSelectedflashCards([]);
    };

    const handleflashCardClick = (flashCard) => {
        setSelectedflashCard(flashCard);
    };

    const formatDateString = (dateString) => {
        const date = new Date(Number(dateString));

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const filteredflashCards = flashCards
        .filter((flashCard) =>
            flashCard.deckname.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((flashCard) =>
            selectedClass
                ? flashCard.targetClass === parseInt(selectedClass)
                : true
        )
        .sort((a, b) => {
            if (sortOption === "date") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortOption === "questions") {
                return b.numberOfQues - a.numberOfQues;
            }
            return 0;
        });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (selectedflashCard) {
        return (
            <div className="quiz-detail">
                <button
                    className="back-button"
                    onClick={() => setSelectedflashCard(null)}
                >
                    Back
                </button>
                <h1>{selectedflashCard.name}</h1>
                <h2>Published for Class {selectedflashCard.class}</h2>
                <div>
                    <h3>
                        1. Which of the following is an example of evolution?
                    </h3>
                    <p>A deer growing antlers as it matures</p>
                    <p>A bird learning to sing a new song</p>
                    <p>
                        A fish changing colors to blend in with its surroundings
                    </p>
                    <p>A snake shedding its skin</p>
                </div>
                <div>
                    <h3>
                        2. What is the term for process which species evolve
                        similar traits due to shared environmental pressures?
                    </h3>
                    <p>Convergent evolution</p>
                    <p>Divergent evolution</p>
                    <p>Co-evolution</p>
                    <p>Adaptive radiation</p>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            {flashCards.length === 0 ? (
                renderNoflashCards()
            ) : (
                <div className="quizzes">
                    <div className="quizzes-header">
                        <h1>FlashCards</h1>
                        <button
                            className="create-quiz-button"
                            onClick={onCreateFlashCards}
                        >
                            + Create a flashcard
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
                                onChange={(e) =>
                                    setSelectedClass(e.target.value)
                                }
                            >
                                <option value="">Filter by Tags</option>
                                <option value="tag-1">Tag 1</option>
                                <option value="tag-2">Tag 2</option>
                            </select>
                            <select
                                className="sort-by"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="">Sort by</option>
                                <option value="date">Date</option>
                                <option value="questions">
                                    Number of Questions
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="deleteRow">
                        <button
                            className="delete-quiz-button"
                            onClick={handleDelete}
                            disabled={selectedflashCards.length === 0}
                        >
                            Delete flashCard
                        </button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Deckname</th>
                                <th>No. of questions</th>
                                <th>Tags</th>
                                <th>Created at</th>
                                <th>Last attempted</th>
                                <th>Last attempted score</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredflashCards.map((flashCard) => (
                                <tr
                                    key={flashCard._id}
                                    onClick={() =>
                                        handleflashCardClick(flashCard)
                                    }
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedflashCards.includes(
                                                flashCard._id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    flashCard._id
                                                )
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                    <td>{flashCard.deckname}</td>
                                    <td>{flashCard.numberOfQues}</td>
                                    <td>
                                        {flashCard.tags.length
                                            ? flashCard.tags
                                            : "None"}
                                    </td>
                                    <td>
                                        {formatDateString(flashCard.createdAt)}
                                    </td>
                                    <td>{flashCard.lastAttempted}</td>
                                    <td>{flashCard.lastAttemptScore}</td>
                                    <td>...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FlashCard;
