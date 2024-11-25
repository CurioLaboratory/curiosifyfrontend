import React, { useState } from "react";
import "./Widget4.scss";

const Widget4 = () => {
  const [activeDay, setActiveDay] = useState("Today");

  const timetable = {
    Today: {
      past: [
        { course: "CS 162", name: "Circuit Theory", time: "8:00 AM", status: "Absent", location: "SF 13" },
        { course: "MATH 124", name: "Discrete Math", time: "10:30 AM", status: "Attended", location: "FF 10" },
      ],
      upcoming: [
        { course: "CS 136", name: "Introduction to Web Development", time: "1:00 PM", location: "SF 12" },
        { course: "CS 124", name: "Computer Architecture", time: "3:00 PM", location: "SF 20" },
      ],
    },
    Monday: {
      past: [
        { course: "PHYS 101", name: "Physics", time: "9:00 AM", status: "Attended", location: "SF 11" },
      ],
      upcoming: [
        { course: "MATH 201", name: "Calculus II", time: "11:00 AM", location: "FF 21" },
        { course: "CS 105", name: "Algorithms", time: "3:00 PM", location: "SF 14" },
      ],
    },
    Tuesday: {
      past: [],
      upcoming: [
        { course: "CS 102", name: "Data Structures", time: "2:00 PM", location: "SF 17" },
      ],
    },
    // Add other days as necessary
  };

  const handleDayChange = (event) => {
    setActiveDay(event.target.value);
  };

  const activeTimetable = timetable[activeDay] || { past: [], upcoming: [] };

  return (
    <div className="widget4">
      <h2>Time Table</h2>
      <div className="dropdown">
        <select value={activeDay} onChange={handleDayChange} className="day-selector">
          {Object.keys(timetable).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div className="section">
        <h3>Past</h3>
        {activeTimetable.past.length > 0 ? (
          <ul>
            {activeTimetable.past.map((event, index) => (
              <li key={index} className={`event ${event.status.toLowerCase()}`}>
                <div className="details">
                  <span className="course">{event.course}</span>
                  <span className="name">{event.name}</span>
                </div>
                <div className="info">
                  <span className="time">{event.time}</span>
                  <span className="location">{event.location}</span>
                  <span className={`status ${event.status.toLowerCase()}`}>{event.status}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No past events</p>
        )}
      </div>
      <div className="section">
        <h3>Upcoming</h3>
        {activeTimetable.upcoming.length > 0 ? (
          <ul>
            {activeTimetable.upcoming.map((event, index) => (
              <li key={index} className="event upcoming">
                <div className="details">
                  <span className="course">{event.course}</span>
                  <span className="name">{event.name}</span>
                </div>
                <div className="info">
                  <span className="time">{event.time}</span>
                  <span className="location">{event.location}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default Widget4;
