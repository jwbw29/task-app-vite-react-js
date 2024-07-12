import axios from "axios";

const apiUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:3001/api";

export const getTasks = async (userId) => {
  const response = await axios.get(`${apiUrl}/tasks`, { params: { userId } });
  return response.data;
};

export const updateTask = async (userId, id, title, completed) => {
  await axios.put(`${apiUrl}/tasks?id=${id}`, { title, completed, userId });
};

export const deleteTask = async (userId, id) => {
  await axios.delete(`${apiUrl}/tasks?id=${id}`, { params: { userId } });
};

export const addTask = async (userId, title) => {
  const response = await axios.post(`${apiUrl}/tasks`, { title, userId });
  return response.data;
};
