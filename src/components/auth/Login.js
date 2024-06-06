import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <h1 className="logo">CURIOSIFY</h1>
      <h2>Welcome Back!</h2>
      <p>Sign in to Curiosify account</p>
      <form>
        <label>
          Student Email
          <input type="email" placeholder="Enter email address" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter password" />
        </label>
        <div className="form-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Register</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
