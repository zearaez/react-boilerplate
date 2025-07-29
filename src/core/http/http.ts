import axios from "axios";

/**
 * Http Utility.
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
