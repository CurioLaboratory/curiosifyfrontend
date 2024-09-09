import React from 'react';
import './StudentLogin.scss';  // Ensure this points to your SCSS file

const StudentLogin = () => {
  return (
    <div className="parentdiv">
    <div className="Student-login-container">
      <div className="login-logo">
        <img src="../icons/logo.png" alt="Curiosify Logo" />
      </div>
      <div className="login-welcome">
        <h1>Welcome Back!</h1>
        <p>Sign in to Curiosify account</p>
      </div>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Student Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group forgot-password">
          <a href="/">Forgot Password?</a>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </div>
  );
};

export default StudentLogin;
