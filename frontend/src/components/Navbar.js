// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const hasToken = !!localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  function goLogin() {
    navigate("/login");
  }

  function goRegister() {
    navigate("/register");
  }

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        BugTracker Pro
      </div>

      <div className="nav-right">
        {user && hasToken ? (
          <>
            <span className="nav-user">{user.name || user.email}</span>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-small" onClick={goLogin}>
              Login
            </button>
            <button className="btn btn-primary btn-small" onClick={goRegister}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

