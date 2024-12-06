import React, { useState } from 'react';
import './AttendanceSheet.scss';
import axiosInstance from '../../axiosInstance';

const AttendanceSheet = () => {
  const [studentClass, setStudentClass] = useState('4');
  const [date, setDate] = useState('2024-03-20');
  const [attendanceData, setAttendanceData] = useState([]);

  const generateAttendanceSheet = async () => {
    try {
      const response = await axiosInstance.get(`/gradesheet/getGradeSheet`, {
        params: {
          classLevel: studentClass,
          date,
        },
      });

      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error generating attendance sheet:', error);
      alert('Failed to generate attendance sheet. Please try again.');
    }
  };

  return (
    <div className="attendance-sheet">
      <div className="summary">
        <div className="card">
          <p className="title">
            Present <span className="today">| Today</span>
          </p>
          <h2 className="value">145</h2>
          <span className="percentage increase">12% increase</span>
        </div>
        <div className="card">
          <p className="title">
            Attendance <span className="today">| Today</span>
          </p>
          <h2 className="value">145</h2>
          <span className="percentage increase">12% increase</span>
        </div>
        <div className="card">
          <p className="title">
            Absent <span className="today">| Today</span>
          </p>
          <h2 className="value">55</h2>
          <span className="percentage decrease">10% increase</span>
        </div>
      </div>

      <h3>Attendance Sheet</h3>
      <div className="filter-section">
        <div className="filters">
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          >
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="generate-button" onClick={generateAttendanceSheet}>
            Generate Sheet
          </button>
        </div>
      </div>
      <div className="report-section">
        <h3>Attendance Report</h3>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available for the selected date.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
