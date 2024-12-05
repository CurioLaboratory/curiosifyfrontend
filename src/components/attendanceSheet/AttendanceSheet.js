import React, { useState } from 'react';
import './AttendanceSheet.scss';

const AttendanceSheet = () => {
  const [subject, setSubject] = useState('Advance Java');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState('2024-03-20');
  const data = [
    { id: 1, name: 'Maria', semester: 'First', present: 10, absent: 2 },
    { id: 2, name: 'Rajib', semester: 'First', present: 2, absent: 10 },
    { id: 3, name: 'Aditya', semester: 'First', present: 2, absent: 10 },
    { id: 4, name: 'Sreenivasan', semester: 'First', present: 2, absent: 10 },
    { id: 5, name: 'Kathiresan', semester: 'First', present: 2, absent: 10 },
    { id: 6, name: 'Harsh Kataria', semester: 'First', present: 2, absent: 10 },
    { id: 7, name: 'Abhishek Pal', semester: 'First', present: 2, absent: 10 },
  ];

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
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="Advance Java">Advance Java</option>
            <option value="Data Structures">Data Structures</option>
          </select>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="generate-button">Generate Sheet</button>
        </div>
      </div>
      <div className="report-section">
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
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.semester}</td>
                <td>{item.present}</td>
                <td>{item.absent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
