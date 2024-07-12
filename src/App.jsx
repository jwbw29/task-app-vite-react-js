import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TasksPage from "@/pages/TasksPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}
