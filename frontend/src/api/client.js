// src/client.js
import axios from "axios";

const DEMO_MODE = true; // abhi backend connect nahi karna

let client;

if (DEMO_MODE) {
  client = {
    get: async () => ({ data: {} }),
    post: async () => ({ data: {} }),
    put: async () => ({ data: {} }),
    delete: async () => ({ data: {} }),
  };
} else {
  client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
    withCredentials: true,
  });
}

export default client;
