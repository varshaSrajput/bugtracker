// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page page-home">
      <nav className="nav">
        <div className="nav-logo">BugTracker Pro</div>
        <button className="btn btn-small" onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      <main className="home-hero">
        <section className="home-text">
          <h1 className="home-title">
            Track, Prioritise & Fix Bugs Effortlessly
          </h1>
          <p className="home-sub">
            A lightweight bug-tracking app for small teams and personal projects.
          </p>

          <ul className="home-list">
            <li>Login securely and manage your own bugs</li>
            <li>Create, update and resolve issues with priorities</li>
            <li>View all bugs in a clean dashboard</li>
          </ul>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
}
