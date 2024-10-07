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
