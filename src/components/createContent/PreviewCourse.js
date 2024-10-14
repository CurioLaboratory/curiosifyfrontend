import React, { useState , useEffect} from "react";
import "./previewCourse.css";

const PreviewCourse = ({ setCurrentPage ,setChapterModuleData,courseGenerated,loading}) => {
  const [expandedChapter, setExpandedChapter] = useState(null);
 const [courseData,setCourseData]=useState([]);

  const handleChapterClick = (chapterIndex) => {
    setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex);
  };

  const handleModuleClick = (chapterIndex, moduleIndex, moduleData) => {
    setChapterModuleData(moduleData)
    setCurrentPage('create-content-module');
    };
    useEffect(() => {
          const data = JSON.parse(localStorage.getItem("createCourses")) || [];
          // console.log("Loaded textAiTabQuiz data:", data);
          setCourseData(data);
          // console.log(quizAiData.totalQuestions);
        
      }, [courseGenerated]);
      const data=[
        {
          Chapter: "Introduction to Physics",
          Modules: [
            {
              Name: "Basics of Motion",
              Explanation: "This module explains the basics of motion, including velocity and acceleration."
            },
            {
              Name: "Newton's Laws",
              Explanation: "This module covers Newton's three laws of motion."
            },
            {
              Name: "Forces and Friction",
              Explanation: "This module explores different types of forces and the concept of friction."
            }
          ]
        },
        {
          Chapter: "Thermodynamics",
          Modules: [
            {
              Name: "Introduction to Thermodynamics",
              Explanation: "This module introduces thermodynamic principles."
            },
            {
              Name: "Laws of Thermodynamics",
              Explanation: "This module explains the first, second, and third laws of thermodynamics."
            },
            {
              Name: "Applications of Thermodynamics",
              Explanation: "This module discusses real-life applications of thermodynamic principles."
            }
          ]
        }
      ]
      
if(loading) return <div>Loading</div>
  return (
    
    <div className="preview-container">
      <h2 className="preview-title">Preview</h2>
      {courseData.map((chapter, chapterIndex) => (
        <div key={chapterIndex} className="chapter">
          <div
            className="chapter-header"
            onClick={() => handleChapterClick(chapterIndex)}
          >
            <div className="chapter-number">{chapterIndex + 1}</div>
            <div className="chapter-title">{chapter.Chapter}</div>
            <div className="chapter-icon">
              {expandedChapter === chapterIndex ? "-" : "+"}
            </div>
          </div>
          {expandedChapter === chapterIndex && (
            <div className="module-list">
              {chapter.Modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="module"
                  onClick={() =>
                    handleModuleClick(chapterIndex, moduleIndex, module)
                  }
                >
                  <div className="module-header">
                    <div className="module-title">{module.Name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PreviewCourse;
