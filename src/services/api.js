import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // 🔥 DO NOT attach token for login
  if (token && !req.url.includes("/auth/login")) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;