// src/pages/TasksPage.jsx

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import TasksList from "@/components/TasksList";
import CompletedTasksList from "@/components/CompletedTasksList";
import AddTask from "@/components/AddTask";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { getTasks, updateTask, deleteTask, addTask } from "@/api/tasksClient";
import TasksListSkeleton from "@/components/TasksListSkeleton";

const TasksPage = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [hasCompletedTasks, setHasCompletedTasks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Anonymously authenticate the user
  useEffect(() => {
    const signInAnonymously = async () => {
      const { user, error } = await supabase.auth.signIn({
        provider: "anonymous",
      });
      if (error) {
        console.error("Error signing in: ", error);
      } else {
        console.log("User signed in:", user);
        setUser(user);
      }
    };
    signInAnonymously();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        setLoading(true);
        console.log("Fetching tasks for user:", user.id);
        const fetchedTasks = await getTasks(user.id);
        setTasks(fetchedTasks);
        const completedExist = fetchedTasks.some((task) => task.completed);
        setHasCompletedTasks(completedExist);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

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
        await updateTask(user.id, id, updatedTask.title, completed);
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
        await updateTask(user.id, id, title, updatedTask.completed);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      console.error("Task not found:", id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(user.id, id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      updateCompletedTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCreate = async (title) => {
    try {
      const newTask = await addTask(user.id, title);
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
      {loading && <TasksListSkeleton />}
      <TasksList
        tasks={tasks}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      {!showCompletedTasks || !hasCompletedTasks ? (
        <Button
          aria-label="show button"
          disabled={!hasCompletedTasks}
          onClick={handleShowHide}
          size="lg"
          className="my-5"
        >
          Show Completed
        </Button>
      ) : (
        <Button
          aria-label="hide button"
          variant="outline"
          disabled={!hasCompletedTasks}
          onClick={handleShowHide}
          size="lg"
          className="my-5"
        >
          Hide Completed
        </Button>
      )}
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
