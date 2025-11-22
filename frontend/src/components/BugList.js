import React from "react";
import api from "../api";

export default function BugList({ bugs, onChanged }) {
  async function updateStatus(id, status) {
    try {
      await api.put(`/bugs/${id}`, { status });
      if (onChanged) onChanged();
    } catch (err) {
      console.error("Failed to update bug", err);
    }
  }

  async function deleteBug(id) {
    if (!window.confirm("Delete this bug?")) return;
    try {
      await api.delete(`/bugs/${id}`);
      if (onChanged) onChanged();
    } catch (err) {
      console.error("Failed to delete bug", err);
    }
  }

  if (!bugs.length) {
    return <p className="muted">No bugs yet. Create one on the left.</p>;
  }

  return (
    <div className="bug-list">
      {bugs.map((b) => (
        <div className="bug-item" key={b.id}>
          <div className="bug-main">
            <h3>{b.title}</h3>
            <p className="muted">{b.description || "No description"}</p>
          </div>
          <div className="bug-meta">
            <span className={`pill priority ${b.priority.toLowerCase()}`}>
              {b.priority}
            </span>
            <span className="pill status">{b.status}</span>
            <div className="bug-actions">
              <button
                className="chip"
                onClick={() => updateStatus(b.id, "In Progress")}
              >
                Start
              </button>
              <button
                className="chip"
                onClick={() => updateStatus(b.id, "Resolved")}
              >
                Resolve
              </button>
              <button className="chip danger" onClick={() => deleteBug(b.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
