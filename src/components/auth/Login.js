import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import { loginUser } from './AuthAPI';
import './Login.scss';
import axiosInstance from "../../axiosInstance";

const Login = () => {
  const [userType, setUserType] = useState('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (email.length !== 0 && password.length !== 0) {
      try {
        const user = await axiosInstance.post("/auth/login", {
          email, password
        });
        login({ ...user.data.user, token: user.data.token});
        navigate('/home');
      } catch (error) {
        setError(error.response.data.message);
        console.log(error);
      }
    }
  }

//   const teacherSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const user = await loginUser(email, password);
//       login(user);
//       navigate('/home');
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   const studentSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const user = await loginUser(email, password);
//       login(user);
//       navigate('/home');
//     } catch (error) {
//       setError(error.message);
//     }
// };

return (
  <div className="login-container">
      <div className="logo"><img src="/icons/logo.png" alt="Logo" /></div>
      <h2>Welcome Back!</h2>
      <p>Sign in to Curiosify account</p>
      {location.state?.registered && <p style={{ color: 'green' }}>Registration Successful!</p>}

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
        <form onSubmit={handleSubmit}>
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
        </form> : <form onSubmit={handleSubmit}>
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
