// ActivitiesConduct.js
import React from 'react';

const ActivitiesConduct = ({ activities }) => {
  return (
    <div className="activities-conduct card">
      <h3>Activities and Conduct</h3>
      {activities.map((activity, index) => (
        <div className="activity" key={index}>
          <p>{activity.name}</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${activity.completion}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesConduct;
