import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {

  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [hasVerified, setHasVerified] = useState(false);

  const handleVerifyEmail = async () => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (!token) {
      setMessage('No token provided!');
      return;
    }

    if (!hasVerified) {
      
      try {
        const response = await axios.post('http://localhost:5000/api/auth/verify-email', { token });
        setMessage('Email successfully verified, redirecting to login page...');
        // Navigate to login page after successful verification
        setTimeout(() => {
          navigate('/');
        }, 2000); // Optional: wait for 2 seconds before navigating
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Invalid or expired token!');
        }
      } finally {
        setHasVerified(true); // Prevent duplicate calls
      
      }
    }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <button onClick={handleVerifyEmail} disabled={hasVerified}>
        Verify Email
      </button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
