import React, { useState } from 'react';
import './LessonPlan.scss';

const LessonPlan = () => {
  const [radioSelection, setRadioSelection] = useState('extract');
  const [generationMethod, setGenerationMethod] = useState('generate');

  return (
    <div className="lesson-plan-container">
      <h2>Create a Lesson Plan</h2>

      <form className="lesson-plan-form">
        <div className="radio-group">
          <p>How do you want to start?</p>
          <label>
            <input
              type="radio"
              name="start-method"
              value="extract"
              checked={radioSelection === 'extract'}
              onChange={() => setRadioSelection('extract')}
            />
            Extract from syllabus
          </label>
          <label>
            <input
              type="radio"
              name="start-method"
              value="auto"
              checked={radioSelection === 'auto'}
              onChange={() => setRadioSelection('auto')}
            />
            Auto create from subject
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="lesson-name">Name your lesson plan</label>
          <input
            type="text"
            id="lesson-name"
            placeholder="e.g. Physics Guide"
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade-level">Enter grade level</label>
          <select id="grade-level">
            <option>Advance Java</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">What subject would you like to generate a plan for</label>
          <input
            type="text"
            id="subject"
            placeholder="e.g. Computer Science"
          />
        </div>

        <div className="radio-group">
          <p>How do you want to generate the plan?</p>
          <label>
            <input
              type="radio"
              name="generation-method"
              value="generate"
              checked={generationMethod === 'generate'}
              onChange={() => setGenerationMethod('generate')}
            />
            Generate myself
          </label>
          <label>
            <input
              type="radio"
              name="generation-method"
              value="auto-generate"
              checked={generationMethod === 'auto-generate'}
              onChange={() => setGenerationMethod('auto-generate')}
            />
            Auto generate with Curiosify
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="learn-by">Add "Learn by" date(s)</label>
          <input
            type="date"
            id="learn-by"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select id="language">
            <option>English</option>
          </select>
        </div>

        <div className="file-upload">
          <label htmlFor="document">Add a document</label>
          <div className="upload-box">
            <p>Drag and drop or <span>Choose File</span></p>
            <p>DOCX, JPEG, JPG, PNG, and PDF formats (upto 5 MB)</p>
          </div>
        </div>

        <button type="submit" className="create-button">Create new</button>
      </form>
    </div>
  );
};

export default LessonPlan;
