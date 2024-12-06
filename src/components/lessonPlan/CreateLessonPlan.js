import React, { useState } from "react";
import "./CreateLessonPlan.scss";

const CreateLessonPlan = () => {
  const [startOption, setStartOption] = useState("syllabus");
  const [generationOption, setGenerationOption] = useState("myself");

  return (
    <div className="create-lesson-plan full-page">
      <div className="container">
        <h1 className="title">Create a Lesson Plan</h1>
        <form>
          {/* Start Option */}
          <div className="form-group">
            <label className="form-label">How do you want to start?</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="startOption"
                  value="syllabus"
                  checked={startOption === "syllabus"}
                  onChange={(e) => setStartOption(e.target.value)}
                />
                Extract from syllabus
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="startOption"
                  value="subject"
                  checked={startOption === "subject"}
                  onChange={(e) => setStartOption(e.target.value)}
                />
                Auto create from subject
              </label>
            </div>
          </div>

          {/* Lesson Name */}
          <div className="form-group">
            <label htmlFor="lessonName" className="form-label">
              Name your lesson plan
            </label>
            <input
              type="text"
              id="lessonName"
              className="form-input"
              placeholder="e.g. Physics Guide"
            />
          </div>

          {/* Grade Level */}
          <div className="form-group">
            <label htmlFor="gradeLevel" className="form-label">
              Enter grade level
            </label>
            <select id="gradeLevel" className="form-select">
              <option value="Advance Java">Advance Java</option>
            </select>
          </div>

          {/* Subject */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              What subject would you like to generate a plan for
            </label>
            <input
              type="text"
              id="subject"
              className="form-input"
              placeholder="e.g. Computer Science"
            />
          </div>

          {/* Generation Method */}
          <div className="form-group">
            <label className="form-label">Generate method</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="generationOption"
                  value="myself"
                  checked={generationOption === "myself"}
                  onChange={(e) => setGenerationOption(e.target.value)}
                />
                Generate myself
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="generationOption"
                  value="curiosify"
                  checked={generationOption === "curiosify"}
                  onChange={(e) => setGenerationOption(e.target.value)}
                />
                Auto generate with curiosify
              </label>
            </div>
          </div>

          {/* Learn By Date */}
          <div className="form-group">
            <label htmlFor="learnDate" className="form-label">
              Add “Learn by” date(s)
            </label>
            <input type="date" id="learnDate" className="form-input" />
            <p className="hint-text">
              These could be “Mid-term date” or “Final exam dates” or just when
              you want to learn this by. Curiosify will break your topics into
              manageable chunks, but you can adjust!
            </p>
          </div>

          {/* Language */}
          <div className="form-group">
            <label htmlFor="language" className="form-label">
              Language
            </label>
            <select id="language" className="form-select">
              <option value="English">English</option>
            </select>
          </div>

          {/* Add Document */}
          <div className="form-group">
            <label className="form-label">Add a document</label>
            <div className="file-upload">
              <div className="file-upload-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828743.png"
                  alt="Upload Icon"
                />
              </div>
              <label htmlFor="document" className="file-upload-label">
                Drag and drop or <span>Choose File</span>
              </label>
              <input type="file" id="document" className="file-input" />
              <p className="hint-text">
                DOCX, JPEG, JPG, PNG and PDF formats (upto 5 MB)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="create-btn">
            Create new
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLessonPlan;
