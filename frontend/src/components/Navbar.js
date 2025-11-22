// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  })();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="nav">
      <div className="nav-logo">BugTracker Pro</div>
      <div className="nav-right">
        {user && <span className="nav-user">{user.name || user.email}</span>}
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
