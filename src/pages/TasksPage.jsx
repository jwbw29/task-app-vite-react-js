import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import TasksList from "@/components/TasksList";
import CompletedTasksList from "@/components/CompletedTasksList";
import AddTask from "@/components/AddTask";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { getTasks, updateTask, deleteTask, addTask } from "@/api/tasksClient";
import TasksListSkeleton from "@/components/TasksListSkeleton";
import NoTasks from "@/components/NoTasks";

const TasksPage = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [hasCompletedTasks, setHasCompletedTasks] = useState(false);
  const [hasIncompletedTasks, setHasIncompletedTasks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Function to save session to local storage
  const saveSession = (session) => {
    try {
      localStorage.setItem("supabase_session", JSON.stringify(session));
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  // Function to load session from local storage
  const loadSession = () => {
    try {
      const session = localStorage.getItem("supabase_session");
      if (session) {
        return JSON.parse(session);
      }
      return null;
    } catch (error) {
      console.error("Error loading session:", error);
      return null;
    }
  };

  // Function to sign in anonymously
  const signInAnonymously = async () => {
    const session = loadSession();
    if (session) {
      const { data, error } = await supabase.auth.setSession(session);
      if (error) {
        console.error("Error restoring session:", error);
        localStorage.removeItem("supabase_session");
        await signInAnonymously(); // Retry sign-in if session restoration fails
      } else {
        console.log("Session restored:", data);
        setUser(data.user);
      }
    } else {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("Error signing in:", error);
      } else {
        console.log("User signed in:", data.user);
        setUser(data.user);
        saveSession(data.session);
      }
    }
  };

  // Anonymously authenticate the user on component mount
  useEffect(() => {
    if (!sessionChecked) {
      setSessionChecked(true); // Ensure this block runs only once
      signInAnonymously();
    }
  }, [sessionChecked]);

  // Fetch tasks when the user is set
  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        setLoading(true);
        console.log("Fetching tasks for user:", user.id);
        const fetchedTasks = await getTasks(user.id);
        setTasks(fetchedTasks);
        const completedExist = fetchedTasks.some((task) => task.completed);
        setHasCompletedTasks(completedExist);
        const incompletedExist = fetchedTasks.some((task) => !task.completed);
        setHasIncompletedTasks(incompletedExist);
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

  const updateIncompletedTasks = (updatedTasks) => {
    const incompletedExist = updatedTasks.some((task) => !task.completed);
    setHasIncompletedTasks(incompletedExist);
  };

  const handleToggle = async (id, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
    updateCompletedTasks(updatedTasks);
    updateIncompletedTasks(updatedTasks);

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
    updateIncompletedTasks(updatedTasks);

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
      updateIncompletedTasks(updatedTasks);
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
      updateIncompletedTasks(updatedTasks);
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
      {(!tasks || tasks.length === 0 || !hasIncompletedTasks) && !loading && (
        <NoTasks />
      )}
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
