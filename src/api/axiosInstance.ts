import axios from "axios";
import API_URL from "./api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies/sessions are included
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // Use sessionStorage for security
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired. Logging out...");
      sessionStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
