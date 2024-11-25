// Grades.js
import React from 'react';

const Grades = ({ grades }) => {
  return (
    <div className="grades card">
      <h3>Grades</h3>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Final Grade</th>
            <th>A+</th>
            <th>B</th>
            <th>B+</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{grades.finalGrade}</td>
            <td>{grades.aPlus}</td>
            <td>{grades.b}</td>
            <td>{grades.bPlus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
