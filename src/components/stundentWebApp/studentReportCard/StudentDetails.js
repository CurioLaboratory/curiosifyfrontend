// StudentDetails.js
import React from 'react';

const StudentDetails = ({ student }) => {
  return (
    <div className="student-details card">
      <img src="https://offertabs.s3.amazonaws.com/offer/qy9s4z/large/810_1920_6095afa41d80b-SeniorPic.JPG" alt="Student" className="student-photo" />
      <div className="student-info">
        <p><span className="label">Student Name:</span> {student.name}</p>
        <p><span className="label">Class Number:</span> {student.classNumber}</p>
        <p><span className="label">Batch-Year:</span> {student.batchYear}</p>
        <p><span className="label">Class Teacher:</span> {student.classTeacher}</p>
        <p><span className="label">Examination:</span> {student.examination}</p>
        <p><span className="label">Grade:</span> {student.grade}</p>
      </div>
    </div>
  );
};

export default StudentDetails;
