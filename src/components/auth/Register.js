import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Register.scss';
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Customspinner'; // Import the Spinner component

const Register = () => {
  const [userType, setUserType] = useState('teacher');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    classLevel:'',
    password: '',
    collegeName:'VIT',

  });
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== rePassword){
      toast.success("Password and Confirm Password does not match", {
        position: "top-right",
        autoClose: 2000
      });
    }
    if(formData.password.length<8)
    {
      toast.success("Password is too short", {
        position: "top-right",
        autoClose: 2000
      });
    }else{
    if (formData.password.length !== 0 && (formData.password === rePassword)) {
      console.log(formData);
      setLoading(true); // Set loading to true
      try {
        const user = await axiosInstance.post("/auth/signup", { ...formData, role: userType });
        console.log(user);
        toast.success("Please verify your email Address", {
          position: "top-right",
          autoClose: 2000
        });
        setTimeout(() => {
          navigate('/', {
            state: {
              registered: true
            }
          });
        }, 3000);
      } catch (error) {
        toast.warn("Invalid Credentials", {
          position: "top-right",
          autoClose: 2000
        });
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after request
      }
    } }
  }

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
      
      <form onSubmit={handleSubmit}>
        <label>
          {userType === 'teacher' ? 'Teacher Name' : 'Student Name'}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </label>
        <label>
          {userType === 'teacher' ? 'Teacher Email' : 'Student Email'}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        {userType==='student' && <label>
          Class
          <input
            type="text"
            name="classLevel"
            value={formData.classLevel}
            onChange={handleChange}
            placeholder="Class e.g. 9,10.."
            required
          />
        </label>}
       
                    <label>Choose College
                    <select name="collegeName" value={formData.collegeName} onChange={handleChange}>
                        <option value="VIT">VIT</option>
                        <option value="IIT Guwahati">IIT Guwahati</option>
                    </select>
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
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />
        </label>
        <div className="form-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/">Login</a>
        </div>
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? <Spinner /> : 'Register'}
        </button>
      </form>
      
      <ToastContainer />
    </div>
  );
};

export default Register;
