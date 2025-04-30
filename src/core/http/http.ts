import axios from 'axios';

/**
 * Http Utility.
 */
const http = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL + 'api/v1',
  baseURL: 'https://localhost:4200/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
