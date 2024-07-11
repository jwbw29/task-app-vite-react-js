import axios from "axios";

const apiUrl = import.meta.env.PROD
  ? import.meta.env.NEXT_PUBLIC_VITE_API_URL
  : "http://localhost:3001/api";

export const getTasks = async () => {
  const response = await axios.get(`${apiUrl}/tasks`);
  return response.data;
};

export const updateTask = async (id, title, completed) => {
  await axios.put(`${apiUrl}/tasks?id=${id}`, { title, completed });
};

export const deleteTask = async (id) => {
  await axios.delete(`${apiUrl}/tasks?id=${id}`);
};

export const addTask = async (title) => {
  const response = await axios.post(`${apiUrl}/tasks`, { title });
  return response.data;
};
