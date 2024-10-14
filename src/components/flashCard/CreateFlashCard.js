import React, { useState } from "react";
import "./CreateFlashCard.scss";
import axiosInstance from "../../axiosInstance";

const CreateFlashCard = (props) => {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [language, setLanguage] = useState("English");
    const [title, setTitle] = useState("");
    const [document, setDocument] = useState(null);
    const [questionType, setQuestionType] = useState("Multiple single choice");
    const [numQuestions, setNumQuestions] = useState(1);
    const [level, setLevel] = useState("");
    const [startPage, setStartPage] = useState("");
    const [endPage, setEndPage] = useState("");
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");
    const [studyType, setStudyType] = useState("Quick Practice");
    const [targetClass, setTargetClass] = useState("Class 9");
    const [studyPeriod, setStudyPeriod] = useState("Daily");
    const [deckname, setDeckname] = useState("");
    const [step, setStep] = useState(1);

    const handleDocumentUpload = (event) => {
        setDocument(event.target.files[0]);
    };

    const handleGenerateDocument = () => {
        // Handle quiz generation logic
    };

    const handleGenerateAuto = () => {
        // Handle quiz generation logic
    };

    const handleGenerateManual = async () => {
        // Handle quiz generation logic
        try {
            const response = await axiosInstance.post(
                "/flashcard/createManual",
                {
                    deckname,
                    numberOfQues: numQuestions,
                    tags: [],
                    createdAt: Date.now(),
                    studyType,
                    targetClass,
                    question,
                    answer,
                }
            );

            if (response.status === 201) {
                window.alert("Flashcard created!");
                resetFields();
                props.setCurrentPage("flashcards");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const resetFields = () => {
        setDeckname("");
        setNumQuestions(1);
        setQuestion("");
        setAnswer("");
    }

    const renderDocumentTab = () => (
        <div className="form-container">
            <form>
                <div className="form-group">
                    <label className="p3">Upload source document</label>
                    {/* <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select> */}
                    <input type="file" id="support-document" hidden />
                    <label for="support-document">
                        <img
                            className="event-card-img"
                            src="./icons/uploadDoc.png"
                            alt="Upload"
                        />
                        <span>Supports .pdf & .jpg document formats</span>
                    </label>
                </div>
                <div className="form-group">
                    <label>Deckname</label>
                    <input
                        type="text"
                        value={deckname}
                        placeholder="e.g. Deckname"
                        onChange={(e) => setDeckname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Select study type:</label>
                    <div className="study-type-input">
                        <span>
                            <input
                                type="radio"
                                id="quick-practice"
                                value="Quick Practice"
                                checked={studyType === "Quick Practice"}
                                onChange={() => setStudyType("Quick Practice")}
                            />
                            <label htmlFor="quick-practice">
                                Quick Practice
                            </label>
                        </span>
                        <span>
                            <input
                                type="radio"
                                id="class-games"
                                value="Class Games"
                                checked={studyType === "Class Games"}
                                onChange={() => setStudyType("Class Games")}
                            />
                            <label htmlFor="class-games">Class Games</label>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Number of questions</label>
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Class:</label>
                    <select
                        value={targetClass}
                        onChange={(e) => setTargetClass(e.target.value)}
                    >
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Study Period:</label>
                    <select
                        value={studyPeriod}
                        onChange={(e) => setStudyPeriod(e.target.value)}
                    >
                        <option value="Daily">Daily</option>
                        <option value="Once a week">Once a week</option>
                        <option value="Twice a week">Twice a week</option>
                        <option value="Space repetition">
                            Space repetition
                        </option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Start page (Optional)</label>
                    <input
                        type="text"
                        value={startPage}
                        onChange={(e) => setStartPage(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>End page (Optional)</label>
                    <input
                        type="text"
                        value={endPage}
                        onChange={(e) => setEndPage(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleGenerateDocument}
                    className="generate-button"
                >
                    Generate
                </button>
            </form>
        </div>
    );

    const renderTextAutoTab = () => (
        <div className="form-container">
            <form>
                <div className="form-group">
                    <label>Deckname</label>
                    <input
                        type="text"
                        value={deckname}
                        placeholder="e.g. Deckname"
                        onChange={(e) => setDeckname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        value={subject}
                        placeholder="e.g. Biology"
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Topic</label>
                    <input
                        type="text"
                        value={topic}
                        placeholder="e.g. Evolution"
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Level (Optional)</label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Class (Optional)</label>
                    <select
                        value={targetClass}
                        onChange={(e) => setTargetClass(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Select study type:</label>
                    <div className="study-type-input">
                        <span>
                            <input
                                type="radio"
                                id="quick-practice"
                                value="Quick Practice"
                                checked={studyType === "Quick Practice"}
                                onChange={() => setStudyType("Quick Practice")}
                            />
                            <label htmlFor="quick-practice">
                                Quick Practice
                            </label>
                        </span>
                        <span>
                            <input
                                type="radio"
                                id="class-games"
                                value="Class Games"
                                checked={studyType === "Class Games"}
                                onChange={() => setStudyType("Class Games")}
                            />
                            <label htmlFor="class-games">Class Games</label>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Number of questions</label>
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleGenerateAuto}
                    className="generate-button"
                >
                    Generate
                </button>
            </form>
        </div>
    );

    const renderManualTab = () => (
        <div className="form-container">
            <div>Step {step} of 2</div>

            <form>
                {step === 1 && (
                    <>
                        <div className="form-group">
                            <label>Deckname</label>
                            <input
                                type="text"
                                value={deckname}
                                placeholder="e.g. Deckname"
                                onChange={(e) => setDeckname(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Select study type:</label>
                            <div className="study-type-input">
                                <span>
                                    <input
                                        type="radio"
                                        id="quick-practice"
                                        value="Quick Practice"
                                        checked={studyType === "Quick Practice"}
                                        onChange={() =>
                                            setStudyType("Quick Practice")
                                        }
                                    />
                                    <label htmlFor="quick-practice">
                                        Quick Practice
                                    </label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        id="class-games"
                                        value="Class Games"
                                        checked={studyType === "Class Games"}
                                        onChange={() =>
                                            setStudyType("Class Games")
                                        }
                                    />
                                    <label htmlFor="class-games">
                                        Class Games
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Number of questions</label>
                            <input
                                type="number"
                                value={numQuestions}
                                onChange={(e) =>
                                    setNumQuestions(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Class (Optional)</label>
                            <select
                                value={targetClass}
                                onChange={(e) => setTargetClass(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Class 9">Class 9</option>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 11">Class 11</option>
                                <option value="Class 12">Class 12</option>
                            </select>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className="form-group">
                            <label>Enter your question</label>
                            <input
                                type="text"
                                value={question}
                                placeholder="Question"
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Answer</label>
                            <input
                                type="text"
                                value={answer}
                                placeholder="Answer"
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="manual-btns">
                    {step === 2 && (
                        <>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="generate-button prev-btn"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleGenerateManual}
                                className="generate-button prev-btn"
                            >
                                Generate
                            </button>
                        </>
                    )}

                    {step === 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="generate-button next-btn"
                        >
                            Next
                        </button>
                    )}
                </div>
            </form>
        </div>
    );

    const [selectedMode, setSelectedMode] = useState("document");
    const handleRadioChange = (value) => {
        setSelectedMode(value);
    };

    return (
        <div className="create-flashcard-maindiv">
            <div className="source-div">
                <h3>Select source</h3>
                <div className="source-inputs">
                    <span>
                        <input
                            type="radio"
                            id="document"
                            value="document"
                            checked={selectedMode === "document"}
                            onChange={() => handleRadioChange("document")}
                        />
                        <label htmlFor="document">Document</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="auto"
                            value="auto"
                            checked={selectedMode === "auto"}
                            onChange={() => handleRadioChange("auto")}
                        />
                        <label htmlFor="auto">Auto</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            id="manual"
                            value="manual"
                            checked={selectedMode === "manual"}
                            onChange={() => handleRadioChange("manual")}
                        />
                        <label htmlFor="manual">Manual</label>
                    </span>
                </div>
                <div></div>
            </div>
            <div className="create-quiz-page">
                <div className="container">
                    <div className="left">
                        <div className="left-header">
                            <h2>Set up FlashCard</h2>
                        </div>
                        {/* <div className="tabs">
                        <button className={selectedMode === 'document' ? 'active' : ''} onClick={() => setSelectedMode('Upload')}>Upload</button>
                        <button className={selectedMode === 'Text/AI' ? 'active' : ''} onClick={() => setSelectedMode('Text/AI')}>Text/AI</button>
                        <button className={selectedMode === 'Manual' ? 'active' : ''} onClick={() => setSelectedMode('Manual')}>Manual</button>
                        </div> */}
                        {selectedMode === "document" && renderDocumentTab()}
                        {selectedMode === "auto" && renderTextAutoTab()}
                        {selectedMode === "manual" && renderManualTab()}

                        {/* {uploadModalOpen && (
                        <div className="modal-overlay">
                        <div className="modal">
                        <h2>Upload a document</h2>
                        <input type="file" onChange={handleDocumentUpload} />
                        <small>DOCX, JPEG, JPG, PNG, and PDF formats up to 5 MB</small>
                        <div className="modal-actions">
                        <button onClick={() => setUploadModalOpen(false)}>Cancel</button>
                        <button onClick={() => setUploadModalOpen(false)}>Continue</button>
                        </div>
                        </div>
                        </div>
                        )} */}
                    </div>
                    <div className="right">
                        <div className="right-header">
                            <button type="button" className="publish-button">
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFlashCard;
