import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Register.scss";
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Customspinner";
import img1 from './assets/pen.svg'
import img2 from './assets/indicator.svg'
import img3 from './assets/double.svg'

const Register = () => {
  const [userType, setUserType] = useState("teacher");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    classLevel: "",
    password: "",
    collegeName: "VIT",
  });
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== rePassword) {
      toast.error("Passwords do not match", { autoClose: 2000 });
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const user = await axiosInstance.post("/auth/signup", {
        ...formData,
        role: userType,
      });
      toast.success("Please verify your email address", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/", { state: { registered: true } });
      }, 3000);
    } catch (error) {
      toast.error("Error occurred during registration", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Left Section */}
      <div className="register-form-section">
        <div className="logo">
          <img src="/icons/logo.png" alt="Logo" />
        </div>
        

        <div className="user-type-toggle">
          <button
            className={userType === "teacher" ? "active" : ""}
            onClick={() => setUserType("teacher")}
          >
            Teacher
          </button>
          <button
            className={userType === "student" ? "active" : ""}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            {userType === "teacher" ? "Teacher Name" : "Student Name"}
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
            {userType === "teacher" ? "Teacher Email" : "Student Email"}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </label>
          {userType === "student" && (
            <label>
              Class
              <input
                type="text"
                name="classLevel"
                value={formData.classLevel}
                onChange={handleChange}
                placeholder="Class (e.g., 9, 10, etc.)"
                required
              />
            </label>
          )}
          <label>
            Choose College
            <select
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
            >
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
              placeholder="Re-enter Password"
              required
            />
          </label>
          <div className="form-footer">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/">Login</a>
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? <Spinner /> : "Register"}
          </button>
        </form>
      </div>

       {/* Right Section */}
       <div className="promo-section">
        <div className="customer">
          <h1>What's Our <br /> Customer Said</h1>
          <img src={img2} alt="" className="indicator" />
        </div>
        <div className="tag">
          <img src={img3} alt="" />
        <p>"Curiosify is our campus lifeline—secure,</p> 
        <p>efficient, and well-supported for seamless</p>
        <p>learning!"</p>
        </div>
        <div className="imageContainer">
        <img
          src={img1}
          alt="Preview"
          className="tablet-preview"
          
        />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
