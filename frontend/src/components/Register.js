// frontend/src/components/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // POST /register  (baseURL + "/register" => .../api/register)
      await api.post("/register", {
        name,
        email,
        password,
        role,
      });

      // On success go to login page
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="page page-auth">
      <div className="card">
        <h2 className="card-title">Register</h2>
        <p className="card-subtitle">
          Create your account to start using BugTracker.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

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

          <label>
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="developer">Developer</option>
              <option value="tester">Tester</option>
              <option value="manager">Manager</option>
            </select>
          </label>

          {error && (
            <p className="status-text" style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>

        <p className="muted" style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;



