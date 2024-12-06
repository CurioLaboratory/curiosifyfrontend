// PaySlip.js
import React from "react";
import "./PaySlip.scss";

const PaySlip = () => {
  return (
    <div className="payslip-container">
       {/* Teacher Details Section */}
       <div class="teacher-details-card">
  <h3 class="card-heading">Teacher Details</h3>
  <div class="teacher-details">
    <div class="teacher-photo">
      <img src="https://via.placeholder.com/100" alt="Teacher Photo" />
    </div>
    <div class="details">
      <p>
        <span>Teacher Name</span> Jane H
      </p>
      <p>
        <span>Email id</span> johndoe@gmail.com
      </p>
      <p>
        <span>Classes Taken</span> 112
      </p>
      <p>
        <span>Class</span> 3rd and 4th
      </p>
      <p>
        <span>Subject Matter</span> Physics
      </p>
      <p>
        <span>Exp</span> 8 Years
      </p>
    </div>
  </div>
</div>


      {/* Summary Section */}
      <div className="summary-grid">
        <div className="summary-item">
          <span>Total Earnings</span>
          <strong>47545</strong>
        </div>
        <div className="summary-item">
          <span>Total Deductions</span>
          <strong>5,031.00</strong>
        </div>
        <div className="summary-item">
          <span>NetPay (Rounded)</span>
          <strong>42345</strong>
        </div>
        <div className="summary-item">
          <span>For Period</span>
          <strong>November</strong>
        </div>
        <div className="summary-item">
          <span>Pay Date</span>
          <strong>Oct 4 2024</strong>
        </div>
        <div className="summary-item">
          <span>Currency</span>
          <strong>Indian</strong>
        </div>
      </div>
      <button className="download-btn">Download Pay Slip</button>

      <div className="earnings-deductions">
        <div className="earnings">
          <h3>Earnings</h3>
          <ul>
            <li>
              <span>Basic Pay</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Allowance</span>
              <span>23,700</span>
            </li>
            <li>
              <span>House Rent Allowance</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Leave Travel Allowance</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Overtime</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Total Earnings</span>
              <span>23,700</span>
            </li>
          </ul>
        </div>
        <div className="deductions">
          <h3>Deductions</h3>
          <ul>
            <li>
              <span>Professional Tax</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Provident Fund</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Other Taxes</span>
              <span>23,700</span>
            </li>
            <li>
              <span>TDS</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Total Deductions</span>
              <span>23,700</span>
            </li>
            <li>
              <span>Net Pay</span>
              <span>23,700</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
