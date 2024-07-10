// src/api/tasks.js

import axios from "axios";

// // Check if running in Node.js environment
// const isNode =
//   typeof process !== "undefined" &&
//   process.versions != null &&
//   process.versions.node != null;

// // Use import.meta.env if available, otherwise fallback to process.env for Node.js
// const apiUrl = isNode
//   ? process.env.VITE_API_URL || "http://localhost:8000"
//   : import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getTasks = async () => {
  const response = await axios.get(`${apiUrl}/api/tasks`);
  return response.data;
};

export const updateTask = async (id, title, completed) => {
  await axios.put(`${apiUrl}/api/tasks/${id}`, { title, completed });
};

export const deleteTask = async (id) => {
  await axios.delete(`${apiUrl}/api/tasks/${id}`);
};

export const addTask = async (title) => {
  const response = await axios.post(`${apiUrl}/api/tasks`, { title });
  return response.data;
};
