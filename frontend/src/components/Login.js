// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/login", { email, password });

      // save token + user for navbar
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="page page-auth">
      <div className="card">
        <h2 className="card-title">Login</h2>
        <p className="card-subtitle">
          Use the credentials you created (e.g. admin@example.com).
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && (
            <p className="status-text" style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="muted" style={{ marginTop: 12 }}>
          New user? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
