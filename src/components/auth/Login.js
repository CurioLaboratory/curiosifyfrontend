import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import { loginUser } from './AuthAPI';
import './Login.scss';
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Customspinner';
const Login = () => {
  const [userType, setUserType] = useState('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [Loading,setLoading]= useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (email.length !== 0 && password.length !== 0) {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email, password, role: userType
        });
        if (response.status === 200) {
          setTimeout(() => {
            toast.success("Login Successful", {
              position: "top-right",
              autoClose: 2000
            });
          }, 100);
          setTimeout(() => {
            login({ ...response.data.user, token: response.data.token });
            toast.success('Login Sucessfully', {
              position: "top-right",
              autoClose: 2000,
            });
            navigate('/home');
          }, 2000);
        } else {
          toast.warn("Invalid Credentials", {
            position: "top-right",
            autoClose: 2000
          });
        }
      } catch (error) {
        setError(error.response.data.message);
        toast.error("Invalid Credentials", {
          position: "top-left",
          autoClose: 2000
        });
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
  }

  return (
    <>
    <div className="teacher-login">
      <div className="login-container">
        <div className="logo"><img src="/icons/logo.png" alt="Logo" /></div>
        <h2>Welcome Back!</h2>
        <p>Sign in to Curiosify account</p>
        {/* {location.state?.registered && <p style={{ color: 'green' }}>Registration Successful!</p>} */}
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
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
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
            <button className="form-button" type="submit"> {Loading?<Spinner/>:"Login"}</button>
          </form> : <form onSubmit={handleSubmit}>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
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
            <button className="form-button" type="submit">
              {Loading?<Spinner/>:"Login"}
            </button>
          </form>}
        <ToastContainer />
      </div>
      </div>
    </>
  );
};

export default Login;
