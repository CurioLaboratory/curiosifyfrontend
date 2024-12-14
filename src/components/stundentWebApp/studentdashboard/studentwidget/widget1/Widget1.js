import React from "react";
import "./Widget1.scss";
import axiosInstance from "../../../../../axiosInstance"; // Import axiosInstance for API calls

const Widget1 = () => {
  // Function to handle attendance marking
  const markAttendance = async (type) => {
    // Retrieve the user data from localStorage and parse it
    const userData = JSON.parse(localStorage.getItem("user"));

    // Validate the presence of required data
    if (!userData || !userData.name || !userData.email) {
      alert("User information is missing in localStorage.");
      return;
    }

    const payload = {
      name: userData.name,
      email: userData.email,
      classLevel:userData.classLevel,
    };
    try {
      const response = await axiosInstance.post(`/student_attendance/markattendance`, payload);
      console.log(`${type} attendance marked successfully:`, response.data);
      alert(`${type} attendance marked successfully!`);
    } catch (error) {
      console.error(`Error marking ${type} attendance:`, error);
      alert(`Failed to mark ${type} attendance. Please try again.`);
    }
  };

  return (
    <div className="widget-container">
      <div className="user-info">
        <img
          src="https://offertabs.s3.amazonaws.com/offer/qy9s4z/large/810_1920_6095afa41d80b-SeniorPic.JPG"
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
          <button
            className="attendance-in"
            onClick={() => markAttendance("IN")}
          >
            Attendance in
          </button>
          <button
            className="attendance-out"
            onClick={() => markAttendance("OUT")}
          >
            Attendance out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widget1;
