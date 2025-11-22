import React, { useEffect, useState } from "react";
import api from "../api";
import BugForm from "./BugForm";
import BugList from "./BugList";

export default function Dashboard({ user, onLogout }) {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBugs() {
    try {
      setError("");
      setLoading(true);
      const res = await api.get("/bugs");
      setBugs(res.data);
    } catch (err) {
      console.error("Failed to load bugs", err);
      setError("Failed to load bugs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBugs();
  }, []);

  return (
    <div className="page fade-in">
      <nav className="navbar">
        <div className="logo">BugTracker</div>
        <div className="nav-right">
          {user && <span className="user-pill">{user.name}</span>}
          <button className="btn secondary tiny" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="bug-layout">
        <section className="card slide-up">
          <h2>Create a Bug</h2>
          <p className="muted small-text">
            Add a new bug with title, description, priority and status.
          </p>
          <BugForm onCreated={loadBugs} />
        </section>

        <section className="card slide-up delay">
          <div className="card-header">
            <h2>All Bugs</h2>
          </div>
          {loading ? (
            <p className="muted">Loading bugs…</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <BugList bugs={bugs} onChanged={loadBugs} />
          )}
        </section>
      </main>
    </div>
  );
}

