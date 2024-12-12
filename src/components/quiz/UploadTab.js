import React, { useState } from "react";
import "./CreateQuiz.scss";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

const UploadTab = (props) => {
  const { getUser } = useAuth();

  const [formData, setFormData] = useState({
    language: "English",
    title: "",
    questionType: "Multiple Single choice",
    numQuestions: 1,
    level: "Easy",
    startPage: "",
    endPage: "",
    classLevel: "9",
    subject: "",
  });

  const [file, setFile] = useState(null);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();

    // Check for missing required fields
    if (!formData.title || !formData.level || !formData.numQuestions || !formData.language || !formData.subject) {
      toast.info("Please fill out all required fields!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const data = new FormData();
    data.append("file", file);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      props.setLoading(true); // Show loading spinner

      // API request to generate quiz
      const res = await axiosInstance.post("/quiz/genrateQuizUpload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data.generatedQuestions) {
        throw new Error("Failed to generate quiz.");
      }
      console.log("res"+res.data.generatedQuestions)
      const quizData = res.data.generatedQuestions;
      setGeneratedQuestions(quizData);
     // console.log(quizData)

      const extractedQuestions = quizData.map((item) => {
        return {
          type:item.questionType, 
          question: item.question,
          options: item.options,
          answer: item.correct_answer,
        };
      });
      //console.log(extractedQuestions)

      // Save quiz locally and reset the form
      const user = getUser();
      const savedQuiz = {
        title: formData.subject + " " + formData.title,
        subject: formData.subject,
        date: new Date().toLocaleDateString(),
        language: formData.language,
        totalQuestions: quizData.length,
        classLevel: formData.classLevel,
        questions:extractedQuestions,
        createdBy: user.email,
        collegeName: user.collegeName,
      };

      localStorage.setItem("uploadTabQuiz", JSON.stringify(savedQuiz));
      toast.success("Quiz generated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
props.setuploadQuizGenerated(!props.uploadQuizGenerated);
      setFormData({
        language: "English",
        title: "",
        questionType: "Multiple Single choice",
        numQuestions: 1,
        level: "Easy",
        startPage: "",
        endPage: "",
        classLevel: "9",
        subject: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error generating quiz:", error.message);
      toast.error("Error generating quiz. Please try again.", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      props.setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="form-container">
     
      <form onSubmit={handleGenerateQuiz}>
        <div className="form-group">
          <label>Choose Language</label>
          <select name="language" value={formData.language} onChange={handleInputChange}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enter Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="e.g. Biology"
            required
          />
        </div>
        <div className="form-group">
          <label>Class Level</label>
          <select name="classLevel" value={formData.classLevel} onChange={handleInputChange}>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload a Document</label>
          <input type="file" onChange={handleFileChange} required />
          <small>Supports .pdf & .jpeg document formats</small>
        </div>
        <div className="form-group">
          <label>Question Type</label>
          <select name="questionType" value={formData.questionType} onChange={handleInputChange}>
          <option value="Multiple Single choice">Multiple single choice</option>
        <option value="Subjective">Subjective</option>
        <option value="True/False">True/False</option>
        <option value="Formula Based">Formula Based</option>
        <option value="Mixed">Mixed Questions</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of Questions</label>
          <input
            type="number"
            name="numQuestions"
            value={formData.numQuestions}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Level</label>
          <select name="level" value={formData.level} onChange={handleInputChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Page (Optional)</label>
          <input
            type="text"
            name="startPage"
            value={formData.startPage}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>End Page (Optional)</label>
          <input
            type="text"
            name="endPage"
            value={formData.endPage}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="generate-button">
          Generate Quiz
        </button>
      </form>

     
    </div>
  );
};

export default UploadTab;
