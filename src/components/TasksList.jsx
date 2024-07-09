// src/components/TasksList.jsx

import React from "react";
import TaskItem from "@/components/TaskItem";

const TasksList = ({ tasks, onToggle, onUpdate, onDelete }) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="flex flex-col listContainer">
      <ul>
        {incompleteTasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
