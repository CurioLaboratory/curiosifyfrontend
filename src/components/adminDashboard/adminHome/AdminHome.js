import React from "react";
import "./AdminHome.scss";

const AdminHome = () => {
  return (
    <div className="admin-home">
      {/* Header Section */}
      <header>
        <h1>Hi Parshya, Welcome back!</h1>
        <div className="stats">
          <div className="stat-box">
            <div className="icon-container">
              <img
                src="/icons/home.png"
                alt="Students Icon"
                className="stat-icon"
              />
            </div>
            <div className="data-container">
              <p>Total students</p>
              <h2>1,200</h2>
            </div>
          </div>
          <div className="stat-box">
            <div className="icon-container">
              <img
                src="/icons/home.png"
                alt="Teachers Icon"
                className="stat-icon"
              />
            </div>
            <div className="data-container">
              <p>Total Teacher</p>
              <h2>17</h2>
            </div>
          </div>
          <div className="stat-box">
            <div className="icon-container">
              <img
                src="/icons/home.png"
                alt="Staff Icon"
                className="stat-icon"
              />
            </div>
            <div className="data-container">
              <p>Total staff</p>
              <h2>10</h2>
            </div>
          </div>
        </div>
      </header>

      {/* Earnings and Attendance */}
      <section className="charts">
        <div className="chart-box">
          <div className="chart-box-heading">
          <span >Earning</span>
          </div>
          <div className="chart-box-header">
            <div>
              <h3>Total Earnings</h3>
            </div>
            <div>
              <select>
                <option>April</option>
                <option>April</option>
                <option>April</option>
                <option>April</option>
              </select>
            </div>
          </div>

          <div className="chart-placeholder">[Earnings Chart]</div>
        </div>
        <div className="chart-box">
        <div className="chart-box-heading">
          <span >Attendance</span>
          </div>
          <div className="chart-box-header">
            <div>
              <h3>Total Students</h3>
            </div>
            <div>
              <select>
                <option>Students</option>
                <option>Teachers</option>
                <option>Staff</option>
                <option>Vendors</option>
              </select>
            </div>
          </div>

          <div className="chart-placeholder">[Attendance Chart]</div>
        </div>
      </section>

      {/* Todo Lists and Calendar */}
      <section className="Admin-lists-calendar">
        {/* Todo-list */}
        <div className="todolist">
          <div className="todo-calender-activity-heading">
          <span >Lists</span>
          </div>
          <div className="todo-calender-activity-header">
            <div>
              <h3>Todolists</h3>
            </div>
            <div>
              <select>
                <option>April</option>
                <option>April</option>
                <option>April</option>
                <option>April</option>
              </select>
            </div>
          </div>

          <div className="chart-placeholder">[Earnings Chart]</div>
        </div>


        {/* calender */}
        <div className="calender">
          <div className="todo-calender-activity-heading">
          <span >Events</span>
          </div>
          <div className="todo-calender-activity-header">
            <div>
              <h3>Calendar</h3>
            </div>
            <div>
              <select>
                <option>April</option>
                <option>April</option>
                <option>April</option>
                <option>April</option>
              </select>
            </div>
          </div>
          <div className="chart-placeholder">[Earnings Chart]</div>
        </div>
        {/* Activity */}
        <div className="activities">
          <div className="todo-calender-activity-heading">
          <span >Your Workspace</span>
          </div>
          <div className="todo-calender-activity-header">
            <div>
              <h3>Activities</h3>
            </div>
            <div>
              <select>
                <option>April</option>
                <option>April</option>
                <option>April</option>
                <option>April</option>
              </select>
            </div>
          </div>

          <div className="chart-placeholder">[Earnings Chart]</div>
        </div>
      </section>

      {/* Fee Details */}
      <section className="Admin-fee-details">
        <h3>Fee Details</h3>
        <table>
          <thead>
            <tr>
              <th>S.ID</th>
              <th>Student Name's</th>
              <th>Semester</th>
              <th>Fee Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Maria</td>
              <td>First</td>
              <td>Monthly Fee</td>
              <td className="paid">Paid</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Rajib</td>
              <td>First</td>
              <td>Admission Fee</td>
              <td className="not-paid">Not Paid</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Rajib</td>
              <td>First</td>
              <td>Exam Fees</td>
              <td className="paid">Paid</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHome;
