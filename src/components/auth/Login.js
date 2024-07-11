import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { loginUser } from './AuthAPI';
import './Login.scss';

const Login = () => {
  const [userType, setUserType] = useState('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const teacherSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await loginUser(email, password);
      login(user);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };
  const studentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await loginUser(email, password);
      login(user);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
};
  return (
    <div className="login-container">
      <div className="logo"><img src="/icons/logo.png" alt="Logo" /></div>
      <h2>Welcome Back!</h2>
      <p>Sign in to Curiosify account</p>

      <div className="user-type-toggle">
        <button
          className={userType === 'teacher' ? 'active' : ''}
          onClick={() => setUserType('teacher')}
        >
          Join as a teacher
        </button>
        <button
          className={userType === 'student' ? 'active' : ''}
          onClick={() => setUserType('student')}
        >
          Join as a student
        </button>
      </div>
      {userType === 'teacher' ?
        <form onSubmit={teacherSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label>
            Teacher Email
            <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email address" />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          <div className="form-footer">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register">Register</a>
          </div>
          <button className="form-button" type="submit">Login</button>
        </form> : <form onSubmit={studentSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label>
            Student Email
            <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email address" />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          <div className="form-footer">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register">Register</a>
          </div>
          <button className="form-button" type="submit">Login</button>
        </form>}

    </div>
  );
};

export default Login;
