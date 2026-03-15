import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Session expired or unauthorized
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        
        // Redirect to login if not already there
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } else if (status === 403) {
        // Forbidden - user doesn't have permissions
        toast.error("Access denied. You don't have permission to perform this action.");
      } else if (status === 500) {
        toast.error("Server error. Please try again later.");
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

export { api };

