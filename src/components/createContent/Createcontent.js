import React from "react";
import "./Createcontent.scss";
import card1Image from "./card1.png";
import card2Image from "./card2.png";

const CreateContent = ({ onCreateAssigment,OnCreateCourses }) => {
  return (
    <div className="Createcontent-maindiv">
      <div className="innerdiv">
        <h2>Create content with Curio AI</h2>
      </div>
      <div className="carddiv">
        <div className="card card1" onClick={OnCreateCourses}>
          <div className="card-image">
            <img src={card1Image} alt="Courses" />
          </div>
          <div className="card-content">
            <h3>Courses</h3>
            <p>Create Courses with Curio AI.</p>
          </div>
        </div>

        <div className="card card2" onClick={onCreateAssigment}>
          <div className="card-image">
            <img src={card2Image} alt="Assignments" />
          </div>
          <div className="card-content">
            <h3>Assignments</h3>
            <p>Create assignments with Curio AI.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;
