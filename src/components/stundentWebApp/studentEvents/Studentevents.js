import React, { useEffect, useState } from "react";
import "./Studentevents.scss";
import cardImage from "./card1.png"; // Default image if needed
import axiosInstance from "../../../axiosInstance"; // Adjust the path as needed

const Studentevents = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/event/getallevent"); // Adjust the API endpoint as needed

        setEvents(response.data); // Assuming response.data contains an array of events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="maindiv">
      <div className="innerdiv">
        <h2>All Events</h2>
      </div>
      <div className="carddiv">
        {events.map((event) => (
          <div key={event._id} className="card">
            <div className="card-image">
              <img
                src={event.poster ? event.poster : cardImage} // Use event.photo if available, otherwise fallback to cardImage
                alt="Event"
              />
            </div>
            <div className="card-content">
              <div className="card-header">
                <span className="card-date">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <div className="card-actions">
                  <button className="edit-button">✏️</button>
                  <button className="delete-button">🗑️</button>
                </div>
              </div>
              <div className="card-info">
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Studentevents;
