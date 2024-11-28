import React from 'react';
import './PaySlip.scss';

const PaySlip = () => {
  return (
    <div className="pay-slip-container">
      <h2>Teacher Details</h2>
      <div className="teacher-details">
        <img
          src="https://via.placeholder.com/100" // Replace with actual image URL
          alt="Teacher"
          className="teacher-image"
        />
        <div className="details">
          <p><strong>Teacher Name:</strong> Jane H</p>
          <p><strong>Email id:</strong> johndoe@gmail.com</p>
          <p><strong>Classes Taken:</strong> 112</p>
          <p><strong>Class:</strong> 3rd and 4th</p>
          <p><strong>Subject Matter:</strong> Physics</p>
          <p><strong>Exp:</strong> 8 Years</p>
        </div>
      </div>

      <div className="summary">
        <div className="summary-card">
          <h3>Total Earnings</h3>
          <p>47,545</p>
        </div>
        <div className="summary-card">
          <h3>Total Deductions</h3>
          <p>5,031.00</p>
        </div>
        <div className="summary-card">
          <h3>NetPay (Rounded)</h3>
          <p>42,345</p>
        </div>
        <div className="summary-card">
          <h3>For Period</h3>
          <p>November</p>
        </div>
        <div className="summary-card">
          <h3>Pay Date</h3>
          <p>Oct 4 2024</p>
        </div>
        <div className="summary-card">
          <h3>Currency</h3>
          <p>Indian</p>
        </div>
      </div>

      <button className="download-button">Download Pay Slip</button>

      <div className="pay-details">
        <div className="earnings">
          <h3>Earnings</h3>
          <table>
            <tbody>
              <tr>
                <td>Basic Pay</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>Allowance</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>House Rent Allowance</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>Leave Travel Allowance</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>Overtime</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td><strong>Total Earnings</strong></td>
                <td><strong>23,700</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="deductions">
          <h3>Deductions</h3>
          <table>
            <tbody>
              <tr>
                <td>Professional Tax</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>Provident Fund</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>Other Taxes</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td>TDS</td>
                <td>23,700</td>
              </tr>
              <tr>
                <td><strong>Total Deductions</strong></td>
                <td><strong>23,700</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
