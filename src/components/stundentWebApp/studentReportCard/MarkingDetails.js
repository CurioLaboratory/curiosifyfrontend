// MarkingDetails.js
import React from 'react';

const MarkingDetails = ({ subjects }) => {
  return (
    <div className="marking-details card">
      <h3>Marking Details</h3>
      <div className="term-selection">
        <span>Final Year</span>
      </div>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Lower</th>
            <th>Upper</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.marks}</td>
              <td>{subject.lower}</td>
              <td>{subject.upper}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="download-button">Download Marksheet</button>
    </div>
  );
};

export default MarkingDetails;
