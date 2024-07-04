import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { registerUser } from './AuthAPI';
import './Register.scss';

const Register = () => {
  const [userType, setUserType] = useState('teacher');
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

  const teacherSubmit = async (e) => {
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
  const studentSubmit = async (e) => {
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
      <div className="logo"><img src="/icons/logo.png" alt="Logo" /></div>
      <h2>Welcome!</h2>
      <p>Sign up to Curiosify account</p>

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
            Teacher Name
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
            Teacher Email
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
            <a href="/">Login</a>
          </div>
          <button className="form-button" type="submit">Login</button>
        </form> : <form onSubmit={studentSubmit}>
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
            <a href="/">Login</a>
          </div>
          <button className="form-button" type="submit">Login</button>
        </form>}

    </div>
  );
};

export default Register;
