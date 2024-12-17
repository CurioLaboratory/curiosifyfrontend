import React, { useState } from "react";
import "./CreateFlashCard.scss";
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressSteps from "../quiz/Loader";
const CreateFlashCard = (props) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState(null);
  const [questionType, setQuestionType] = useState("Multiple single choice");
  const [numQuestions, setNumQuestions] = useState(1);
  const [level, setLevel] = useState("");
  const [startPage, setStartPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
  const handleDocumentUpload = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleGenerateDocument = async () => {
    setIsLoading(true);
    if (!document) {
      toast.error("Please upload a document before generating flashcards.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    console.log("doc", document);
    // Create a form data object
    setGeneratedFlashcards([]);
    const formData = new FormData();
    formData.append("file", document);
    formData.append("language", language);
    formData.append("deckname", deckname);
    formData.append("subject", subject);
    formData.append("studyType", studyType);
    formData.append("numberofQuestion", numQuestions);
    formData.append("Class", targetClass);
    if (startPage) formData.append("startPage", startPage);
    if (endPage) formData.append("endPage", endPage);

    try {
      // Make the API call to generate flashcards using the uploaded document
      const response = await axiosInstance.post(
        "flashcard/genrateFlashCardUsingPDF",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        const { deckname, subject, studyType, numberOfFlashcards, flashcards } =
          response.data;

        toast.success(
          `Successfully generated ${numberOfFlashcards} flashcards!`,
          {
            position: "top-right",
            autoClose: 1500,
          }
        );

        setGeneratedFlashcards(flashcards);
        setDocument(null);
        //        console.log(flashcards)
      } else {
        throw new Error("Failed to generate flashcards");
      }
    } catch (error) {
      console.error("Error generating flashcards:", error.message);
      toast.error("Error generating flashcards. Please try again.", {
        position: "top-right",
        autoClose: 1500,
      });
    }finally{
        
        setIsLoading(false);
    }
  };

  const handleGenerateAuto = async () => {
    // Handle quiz generation logic
    // Prepare the data to send in the API request
    setIsLoading(true);
    const requestData = {
      language: "english", // Assuming the language is always English
      deckname, // Name of the deck
      topic, // Topic of the flashcards
      level, // Difficulty level
      subject, // Subject
      studyType, // Study type
      numberofQuestion: numQuestions, // Number of questions to generate
      Class: targetClass, // Target class
    };

    try {
      // Make the API call to generate flashcards
      const response = await axiosInstance.post(
        "flashcard/genrateFlashCardUsingText",
        requestData
      );

      if (response.status === 200) {
        const { deckname, subject, studyType, numberOfFlashcards, flashcards } =
          response.data;

        // console.log("Flashcards generated successfully:", response.data);

        toast.success(
          `Successfully generated ${numberOfFlashcards} flashcards!`,
          {
            position: "top-right",
            autoClose: 1500,
          }
        );

        setGeneratedFlashcards(flashcards); // Example state
        //console.log("flashCards", flashcards);
        
      } else {
        throw new Error("Failed to generate flashcards");
      }
      resetFields();
    } catch (error) {
      console.error("Error generating flashcards:", error.message);
      toast.error("Error generating flashcards. Please try again.", {
        position: "top-right",
        autoClose: 1500,
      });
    }finally{
        setIsLoading(false);
    }
  };

  const handleGenerateManual = async () => {
    try {
      const formattedQuestions = [
        {
          question,
          options: [], // Replace with actual options
          answer,
        },
      ];

      const response = await axiosInstance.post("/flashcard/createManual", {
        deckname,
        numberOfQues: numQuestions,
        tags: [{ tag: "exampleTag" }], // Replace with actual tags
        createdAt: new Date().toISOString(), // Ensure correct date format
        studyType,
        targetClass,
        questions: formattedQuestions, // Array of questions as per schema
      });

      if (response.status === 201) {
        window.alert("Flashcard created!");
        resetFields();
        props.setCurrentPage("flashcards");
      }
    } catch (error) {
      console.error("Error creating flashcard:", error);
      window.alert("Failed to create flashcard. Please try again.");
    }
  };

  const resetFields = () => {
    setDeckname("");
    setNumQuestions(1);
    setQuestion("");
    setAnswer("");
  };

  const handleReset = async () => {
    if (generatedFlashcards.length !== 0) {
      // Clear the flashcards array
      setGeneratedFlashcards([]);

      // Show success toast
      toast.success("Flashcards reset successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      // Show error toast
      toast.error("There is nothing to reset.", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const handlePublish = async () => {
    try {
      // Format the questions dynamically from your form data (questions can now be an array)
      const formattedQuestions = generatedFlashcards.map((q) => ({
        question: q.question, // `q.question` is the text of the question
        options: q.options || [], // If you have options, pass them, otherwise, it will be an empty array
        answer: q.answer, // Correct answer for the question
      }));

      const flashcardQuiz = {
        deckname, // The deck name
        numberOfQues: numQuestions, // The total number of questions
        createdAt: new Date().toISOString(), // Created at timestamp
        studyType, // Study type
        targetClass, // Target class
        questions: formattedQuestions,
      };
      console.log("quizFlashcard", flashcardQuiz);
      // Send the request to the backend
      const response = await axiosInstance.post(
        "/flashcard/createManual",
        flashcardQuiz
      );

      if (response.status === 201) {
        window.alert("Flashcard created!");
        resetFields(); // Clear the fields
        props.setCurrentPage("flashcards"); // Navigate to flashcards page or reset view
      }
    } catch (error) {
      console.error("Error creating flashcard:", error);
      window.alert("Failed to create flashcard. Please try again.");
    }
  };

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
          <input
            type="file"
            id="support-document"
            hidden
            onChange={handleDocumentUpload}
          />
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
              <label htmlFor="quick-practice">Quick Practice</label>
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
            <option value="Space repetition">Space repetition</option>
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
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
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
              <label htmlFor="quick-practice">Quick Practice</label>
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
                    onChange={() => setStudyType("Quick Practice")}
                  />
                  <label htmlFor="quick-practice">Quick Practice</label>
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
            <div className="right-header1">
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="publish-button"
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
            <div>
              {isLoading ? (
               <div className="Loader_animation">
                <ProgressSteps />
                </div>
              ) : (
                generatedFlashcards.map((item, index) => (
                  <div key={index} className="cardQues">
                    <h4>
                      Q{index + 1}: {item.question}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateFlashCard;
