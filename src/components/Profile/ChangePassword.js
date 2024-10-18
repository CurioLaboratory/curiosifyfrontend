import React, { useState } from 'react';
import axiosInstance from "../../axiosInstance";
import './ChangePassword.scss'; // Include your styles

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/changePassword', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setMessage('Password updated successfully!');
      } else {
        setMessage(response.data.message || 'Password update failed.');
      }
    } catch (error) {
      setMessage('An error occurred while updating the password.');
    }
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Change Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;
