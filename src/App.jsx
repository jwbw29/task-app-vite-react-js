import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TasksPage from "@/pages/TasksPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
