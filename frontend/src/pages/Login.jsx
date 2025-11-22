import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(res.data.message || "Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Please login to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="register-link">
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
