// Spinner.js
import React from 'react';
import './Customspinner.scss'; // Make sure to create styles for the spinner

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;
