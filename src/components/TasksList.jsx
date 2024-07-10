// src/components/TasksList.jsx

import TaskItem from "@/components/TaskItem";

const TasksList = ({ tasks = [], onToggle, onUpdate, onDelete }) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="flex flex-col listContainer gap-2">
      <ul>
        {incompleteTasks.map((task) => (
          <li key={task.id} aria-label="incomplete task">
            <TaskItem
              key={task.id}
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
