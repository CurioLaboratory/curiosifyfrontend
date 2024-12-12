import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Customspinner";
import "./Login.scss";
import img1 from './assets/pen.svg'
import img2 from './assets/indicator.svg'
import img3 from './assets/double.svg'

const Login = () => {
  const [userType, setUserType] = useState("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email.length && password.length) {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
          role: userType,
        });
        if (response.status === 200) {
          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 2000,
          });
          setTimeout(() => {
            login({ ...response.data.user, token: response.data.token });
            userType === "teacher"
              ? navigate("/home")
              : navigate("/studenthome");
          }, 2000);
        } else {
          toast.warn("Invalid Credentials!", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error("Invalid Credentials!", {
          position: "top-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-form-section">
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
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email id"
            required
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">
            {loading ? <Spinner /> : "Login"}
          </button>
          <div className="form-footer">
            <span>Don't have an account</span>
            <a href="/register">Create an account</a>
          </div>
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

export default Login;
