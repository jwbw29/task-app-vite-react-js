// src/components/AddTask.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddTask = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title);
      setTitle("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        aria-label="new task input"
        type="text"
        placeholder="Add New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        aria-label="add task button"
        type="submit"
        onClick={handleCreate}
        className="text-lg"
      >
        +
      </Button>
    </div>
  );
};

export default AddTask;
