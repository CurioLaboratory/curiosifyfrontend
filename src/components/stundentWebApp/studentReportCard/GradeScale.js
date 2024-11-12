// GradingScale.js
import React from 'react';

const GradingScale = () => {
  return (
    <div className="grading-scale card">
      <h3>Grading Scale</h3>
      <div className="grading-range">
  <span className="grade-item">A*: 100-96</span>
  <span className="grade-item">A: 95-91</span>
  <span className="grade-item">B+: 90-86</span>
  <span className="grade-item">B: 85-81</span>
  <span className="grade-item">C+: 80-76</span>
  <span className="grade-item">C: 75-71</span>
</div>

    </div>
  );
};

export default GradingScale;
