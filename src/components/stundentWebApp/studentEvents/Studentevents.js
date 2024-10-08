import React from "react";
import "./Studentevents.scss";
import cardImage from "./card1.png"; // Update the path as needed

const Studentevents = () => {
  return (
    <div className="maindiv">
      <div className="innerdiv">
        <h2>All Events</h2>
      </div>
      <div className="carddiv">
        {/* First Card */}
        <div className="card">
          <div className="card-image">
            <img src={cardImage} alt="Event" />
          </div>
          <div className="card-content">
            <div className="card-header">
              <span className="card-date">Sat, 16 Mar</span>
              <div className="card-actions">
                <button className="edit-button">✏️</button>
                <button className="delete-button">🗑️</button>
              </div>
            </div>
            <div className="card-info">
              <h3>Event title</h3>
              <p>Event description</p>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="card">
          <div className="card-image">
            <img src={cardImage} alt="Event" />
          </div>
          <div className="card-content">
            <div className="card-header">
              <span className="card-date">Sun, 17 Mar</span>
              <div className="card-actions">
                <button className="edit-button">✏️</button>
                <button className="delete-button">🗑️</button>
              </div>
            </div>
            <div className="card-info">
              <h3>Event title 2</h3>
              <p>Event description 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentevents;
