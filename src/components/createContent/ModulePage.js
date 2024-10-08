import React from "react";
import "./Createcontent.scss";

const ModulePage = ({chapterModuleData,setCurrentPage}) => {
  
  
  return (
    <div className="MainContainer">
      <button className="backButton" onClick={()=>setCurrentPage("create-courses")}> ← Back</button>
      <h2> {chapterModuleData.Name}</h2>
      <p>{chapterModuleData.Explanation}</p>
    </div>
  );
};

export default ModulePage;
