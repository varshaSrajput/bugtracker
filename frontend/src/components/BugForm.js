import React, { useState } from "react";
import api from "../api";

export default function BugForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/bugs", { title, description, priority, status });
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Open");
      setMsg("Bug created successfully.");
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
      setMsg("Failed to create bug.");
    }
  }

  return (
    <form className="form vertical" onSubmit={handleSubmit}>
      <div className="field-row">
        <input
          type="text"
          placeholder="Bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
      </div>

      <textarea
        className="description-box"
        placeholder="Describe the bug, steps to reproduce, expected vs actual behaviour…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <button type="submit" className="btn full-width">
        Add Bug
      </button>

      {msg && <p className="muted top-space">{msg}</p>}
    </form>
  );
}


