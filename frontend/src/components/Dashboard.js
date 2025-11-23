// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import BugForm from "./BugForm";
import BugList from "./BugList";
import api from "../api";

export default function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- Load bugs from API ----------
  async function fetchBugs() {
    try {
      setLoading(true);
      setError("");
      const resp = await api.get("/bugs"); // GET /api/bugs
      setBugs(resp.data || []);
    } catch (err) {
      console.error("Failed to load bugs", err);
      setError("Failed to load bugs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBugs();
  }, []);

  // ---------- Create bug ----------
  async function handleCreateBug(payload) {
    try {
      await api.post("/bugs", payload); // POST /api/bugs
      await fetchBugs();
    } catch (err) {
      console.error("Failed to create bug", err);
      throw err;
    }
  }

  // ---------- Update bug ----------
  async function handleUpdateBug(id, updates) {
    try {
      await api.put(`/bugs/${id}`, updates); // PUT /api/bugs/:id
      setBugs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
      );
    } catch (err) {
      console.error("Failed to update bug", err);
    }
  }

  // ---------- Delete bug ----------
  async function handleDeleteBug(id) {
    try {
      await api.delete(`/bugs/${id}`); // DELETE /api/bugs/:id
      setBugs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete bug", err);
    }
  }

  return (
    <div className="page page-dashboard">
      <div className="dashboard-root">
        <h1>BugTracker</h1>
        <p className="subtitle">
          Create, track and manage all your project bugs in one place.
        </p>

        <div className="dashboard-grid">
          {/* LEFT / TOP: Create bug card */}
          <div className="bug-card">
            {/* BugForm should call this when the form is submitted */}
            <BugForm onCreateBug={handleCreateBug} />
          </div>

          {/* RIGHT / BOTTOM: Bug list card */}
          <div className="bug-table-wrapper">
            <BugList
              bugs={bugs}
              loading={loading}
              error={error}
              onUpdateBug={handleUpdateBug}
              onDeleteBug={handleDeleteBug}
              onReload={fetchBugs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

