import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const getTasks = async () => {
  const response = await axios.get(`${apiUrl}/api/tasks`);
  return response.data;
};

export const updateTask = async (id, title, completed) => {
  await axios.put(`${apiUrl}/api/tasks?id=${id}`, { title, completed });
};

export const deleteTask = async (id) => {
  await axios.delete(`${apiUrl}/api/tasks?id=${id}`);
};

export const addTask = async (title) => {
  const response = await axios.post(`${apiUrl}/api/tasks`, { title });
  return response.data;
};
