// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("/login", { email, password });

      const { access_token, user } = res.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      setMsg("Login successful, redirecting...");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      console.error(err);
      const server =
        err?.response?.data?.msg || err?.response?.data?.message;
      setMsg(server || "Invalid credentials");
    }
  }

  return (
    <div className="page page-auth">
      <div className="card auth-card">
        <h2 className="card-title">Login</h2>
        <p className="card-subtitle">
          Use the credentials you created (e.g. admin@example.com).
        </p>

        <form onSubmit={handleLogin} className="form">
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        {msg && <p className="muted status-text">{msg}</p>}
      </div>
    </div>
  );
}
