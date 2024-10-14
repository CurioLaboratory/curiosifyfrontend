import React, { useEffect, useState } from "react";
import '../quiz/Righttab.scss'

const ProgressSteps = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timers for step transitions
    const stepTimers = [
      setTimeout(() => setStep(1), 500),    // Step 1: After 0.5 seconds
      setTimeout(() => setStep(2), 2500),   // Step 2: After 2.5 seconds
      setTimeout(() => setStep(3), 4500),   // Step 3: After 4.5 seconds
      setTimeout(() => setStep(4), 6500),   // Step 3 completes: After 6.5 seconds
      setTimeout(() => setStep(5), 7000)    // Show spinner after 8.5 seconds
    ];

    // Cleanup timeouts if component unmounts
    return () => stepTimers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="progress-container">
      {/* Step 1 */}
      <div className={`step ${step >= 1 ? "active" : ""}`} id="step1">
        <div className={`icon ${step >= 2 ? "checkmark" : "spinner"}`} id="spinner1"></div>
        <p className="text">Fetching your assignment... hold tight!</p>
      </div>

      {/* Step 2 */}
      <div className={`step ${step >= 2 ? "active" : ""}`} id="step2">
        <div className={`icon ${step >= 3 ? "checkmark" : "spinner"}`} id="spinner2"></div>
        <p className="text">Analyzing your preferences for the perfect assignment.</p>
      </div>

      {/* Step 3 */}
      <div className={`step ${step >= 3 ? "active" : ""}`} id="step3">
        <div className={`icon ${step >= 4 ? "checkmark" : "spinner"}`} id="spinner3"></div>
        <p className="text">Almost there... preparing a challenge just for you!.</p>
      </div>
      <div className={`step ${step >= 4 ? "active" : ""}`} id="step4">
       
      <div className="final-spinner">
          <div className="icon spinner"></div>
          <p className="text">Finalizing...</p>
        </div>
      </div>
      
    </div>
  );
};

export default ProgressSteps;
