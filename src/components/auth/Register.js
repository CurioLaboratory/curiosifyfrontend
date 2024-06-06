import React, { useState } from 'react';
import './Register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert('Passwords do not match');
      return;
    }
    // Add registration logic here
  };

  return (
    <div className="register-container">
      <h1 className="logo">CURIOSIFY</h1>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </label>
        <label>
          Registration Number
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="Enter registration number"
          />
        </label>
        <label>
          Student Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
