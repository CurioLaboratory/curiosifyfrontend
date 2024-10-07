import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ModulePage = ({chapterModuleData}) => {
  
  

  return (
    <div>
      <h2> {chapterModuleData.Name}</h2>
      <p>{chapterModuleData.Explanation}</p>
    </div>
  );
};

export default ModulePage;
