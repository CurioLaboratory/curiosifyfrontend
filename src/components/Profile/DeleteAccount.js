import React, { useState } from 'react';
import axiosInstance from "../../axiosInstance";
import './DeleteAccount.scss'; // Style your modal accordingly
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isConfirming, setIsConfirming] = useState(false); // Step 2: for confirmation
  const navigate = useNavigate()
  // Handle password submission for verification
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send password for verification
      const response = await axiosInstance.post('/auth/verifyPassword', { password });

      if (response.data.success) {
        // If password is correct, proceed to the confirmation step
        setIsConfirming(true);
      } else {
        setMessage('Incorrect password. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  // Final confirmation for deleting the account
  const handleDeleteAccount = async () => {
    try {
      
      const response = await axiosInstance.delete('/auth/deleteAccount');
      
      if (response.data.success) {
        // Optionally log out the user or redirect them
        setMessage('Account deleted successfully!');
        localStorage.removeItem('user');
        // Perform redirect or logout actions here
        navigate('/');
      } else {
        setMessage(response.data.message || 'Account deletion failed.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the account.');
    }
  };

  return (
    <div className="delete-account-modal">
      {!isConfirming ? (
        <form onSubmit={handlePasswordSubmit}>
          <h2>Enter Password to Delete Account</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Submit Password</button>
          {message && <p className="message">{message}</p>}
        </form>
      ) : (
        <div className="confirm-delete">
          <h2>Are you sure you want to delete your account?</h2>
          <p>This action is irreversible and all your data will be permanently removed.</p>
          <button className="btn confirm" onClick={handleDeleteAccount}>Yes, Delete My Account</button>
          <button className="btn cancel" onClick={() => setIsConfirming(false)}>Cancel</button>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DeleteAccount;
