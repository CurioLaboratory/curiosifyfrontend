import React, { useEffect, useState } from "react";
import './Righttab.scss'
import img1 from './assets/Curiosify.svg'
import './Loader.scss'
const ProgressSteps = () => {
 

  return (
    <div className="containerLogo">
      <div className="logo">
          <img src={img1} alt="Logo" />
        </div>
        <div className="line">
          <p>Curiosify is prepping your quiz. This should be as quick as brewing a coffee. Feel free to explore, and we'll ping you when they're ready.</p>
        </div>
        <div className="btn">
          <button className="cancleButton">Cancel</button>
        </div>
      
    </div>
  );
};

export default ProgressSteps;
