import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { registerUser } from './AuthAPI';
import './Register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    rePassword: '',
    registration_number: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await registerUser(formData);
      login(user);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="logo">CURIOSIFY</h1>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          Student Name
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </label>
        <label>
          Registration Number
          <input
            type="text"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            placeholder="Registration Number"
            required
          />
        </label>
        <label>
          Student Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>
        <label>
          Re-enter Password
          <input
            type="password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
        </label>
        <div className="form-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/login">Login</a>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
