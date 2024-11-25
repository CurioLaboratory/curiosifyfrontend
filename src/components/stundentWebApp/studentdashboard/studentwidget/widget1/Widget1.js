import React from 'react';
import './Widget1.scss';

const Widget1 = () => {
  return (
    <div className="widget-container">
      <div className="user-info">
        <img
          src="https://offertabs.s3.amazonaws.com/offer/qy9s4z/large/810_1920_6095afa41d80b-SeniorPic.JPG" // Replace with actual image path
          alt="User"
          className="user-image"
        />
        <div className="user-details">
          <h3>Jane H</h3>
          <p className="user-email">Janehugo@gmail.com</p>
        </div>
        <div className="user-stats">
          <p>
            Classes taken: <span className="stat-value">5</span>
          </p>
          <p>
            Leaves taken: <span className="stat-value">98</span>
          </p>
        </div>
      </div>
      <div className="time-sheet">
        <div className="time-date">
        <p className="time">Time sheet</p>
        <p className="time-value">5.12 am</p>
        <p className="view-details">View details</p>
        </div>
        <div className="attendance-buttons">
          <button className="attendance-in">Attendance in</button>
          <button className="attendance-out">Attendance out</button>
        </div>
      </div>
    </div>
  );
};

export default Widget1;
