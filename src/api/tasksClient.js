// src/api/tasks.js

import axios from "axios";

const apiUrl = import.meta.env.VERCEL_URL || "http://localhost:3001"; // the <...> is new, but that's what chatGPT suggested. Could me a mistake

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
