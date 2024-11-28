import React, { useState } from 'react';
import './AttendanceSheet.scss';

const AttendanceSheet = () => {
  const [attendanceData] = useState([
    { id: 1, name: 'Maria', semester: 'First', present: 10, absent: 2 },
    { id: 2, name: 'Rajib', semester: 'First', present: 2, absent: 10 },
    { id: 3, name: 'Aditya', semester: 'First', present: 2, absent: 10 },
    { id: 4, name: 'Sreenivasan', semester: 'First', present: 2, absent: 10 },
    { id: 5, name: 'Kathiresan', semester: 'First', present: 2, absent: 10 },
    { id: 6, name: 'Harsh Kataria', semester: 'First', present: 2, absent: 10 },
    { id: 7, name: 'Abhishek Pal', semester: 'First', present: 2, absent: 10 },
  ]);

  return (
    <div className="attendance-container">
      <div className="statistics">
        <div className="stat-card">
          <h3>Present | Today</h3>
          <p>145</p>
          <span>12% increase</span>
        </div>
        <div className="stat-card">
          <h3>Attendance | Today</h3>
          <p>145</p>
          <span>12% increase</span>
        </div>
        <div className="stat-card">
          <h3>Absent | Today</h3>
          <p>55</p>
          <span>10% increase</span>
        </div>
      </div>

      <div className="attendance-sheet">
        <h2>Attendance Sheet</h2>
        <div className="filter-section">
          <label>
            Subject
            <select>
              <option>Advance Java</option>
            </select>
          </label>
          <label>
            Section
            <select>
              <option>A</option>
            </select>
          </label>
          <label>
            Date
            <input type="date" defaultValue="2024-03-20" />
          </label>
          <button>Generate Sheet</button>
        </div>

        <div className="subject-report">
          <h3>Subject Report</h3>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student Name</th>
                <th>Semester</th>
                <th>Total Present Day</th>
                <th>Total Absence Day</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.semester}</td>
                  <td>{student.present}</td>
                  <td>{student.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;
