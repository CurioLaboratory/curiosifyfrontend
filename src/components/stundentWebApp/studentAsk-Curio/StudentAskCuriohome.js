import React from "react";
import card1Image from "./card1.png";
import card2Image from "./card2.png";
import card3Image from "./card3.png"
import "./StudentAskCuriohome.scss";
const StudentAskCuriohome=({setCurrentPage})=>{
return(
        <div className="StudentAskCuriohomemaindiv">
          <div className="innerdiv">
          </div>
          <div className="carddiv">
            <div className="card card1">
              <div className="card-image">
                <img src={card1Image} alt="Courses" />
              </div>
              <div className="card-content">
                <h3>Courses</h3>
                <p>Create Courses with Curio AI.</p>
              </div>
            </div>
    
            <div className="card card2" onClick={()=>{setCurrentPage('StudentAiTutor')}}>
              <div className="card-image">
                <img src={card2Image} alt="Assignments" />
              </div>
              <div className="card-content">
                <h3>Assignments</h3>
                <p>Create assignments with Curio AI.</p>
              </div>
            </div>

            <div className="card card2" onClick={()=>{setCurrentPage('StudentDocChat')}}>
              <div className="card-image">
                <img src={card3Image} alt="Assignments" />
              </div>
              <div className="card-content">
                <h3>Doc Chat</h3>
                <p>Upload any doc and get summaries</p>
              </div>
            </div>
          </div>
        </div>
      );

}

export default StudentAskCuriohome;