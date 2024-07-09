// src/pages/TasksPage.jsx

import React, { useState, useEffect } from "react";
import TasksList from "@/components/TasksList";
import CompletedTasksList from "@/components/CompletedTasksList";
import AddTask from "@/components/AddTask";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { getTasks, updateTask, deleteTask, addTask } from "@/api/tasks";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [hasCompletedTasks, setHasCompletedTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      const completedExist = fetchedTasks.some((task) => task.completed);
      setHasCompletedTasks(completedExist);
    };

    fetchTasks();
  }, []);

  const handleShowHide = () => {
    setShowCompletedTasks((prev) => !prev);
  };

  const updateCompletedTasks = (updatedTasks) => {
    const completedExist = updatedTasks.some((task) => task.completed);
    setHasCompletedTasks(completedExist);
  };

  const handleToggle = async (id, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);

    const updatedTask = updatedTasks.find((task) => task.id === id);
    if (updatedTask) {
      try {
        await updateTask(id, updatedTask.title, completed);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      console.error("Task not found:", id);
    }
  };

  const handleUpdate = async (id, title) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title } : task
    );
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);

    const updatedTask = updatedTasks.find((task) => task.id === id);
    if (updatedTask) {
      try {
        await updateTask(id, title, updatedTask.completed);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      console.error("Task not found:", id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      updateCompletedTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCreate = async (title) => {
    try {
      const newTask = await addTask(title);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      updateCompletedTasks(updatedTasks);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <main className="flex flex-col w-full items-center min-h-screen">
      <ThemeToggle />
      <div className="p-2 m-10">
        <h1>Tasks</h1>
      </div>
      <AddTask onCreate={handleCreate} />
      <TasksList
        tasks={tasks}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Button
        aria-label="show button"
        disabled={!hasCompletedTasks}
        onClick={handleShowHide}
        size="lg"
        className="my-5"
      >
        {showCompletedTasks ? "Hide Completed" : "Show Completed"}
      </Button>
      {showCompletedTasks && (
        <CompletedTasksList
          tasks={tasks}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
};

export default TasksPage;
