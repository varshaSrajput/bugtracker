// frontend/src/api.js
import axios from "axios";

// Backend URLs
const PROD_API = "https://bugtracker-hfqr.onrender.com/api"; // Render backend
const LOCAL_API = "http://127.0.0.1:5000/api";                // Local backend

// Automatically choose local or production based on where the app is running
let API_BASE_URL = PROD_API;

if (typeof window !== "undefined") {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    API_BASE_URL = LOCAL_API;
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
