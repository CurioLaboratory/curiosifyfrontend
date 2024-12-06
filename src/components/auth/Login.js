import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axiosInstance from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Customspinner";
import "./Login.scss";
import img1 from './assets/pen.svg'

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
        <h2>Welcome Back!</h2>
        <p>Sign in to your Curiosify account</p>

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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <div className="form-footer">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register">Register</a>
          </div>
          <button type="submit">
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="promo-section">
        <h1>What Our Customer Said</h1>
        <div>
        <p>"Curiosify is our campus lifeline—secure,</p> 
        <p>efficient, and well-supported for seamless</p>
        <p>learning!"</p>
        </div>
        <img
          src={img1}
          alt="Preview"
          className="tablet-preview"
          
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
