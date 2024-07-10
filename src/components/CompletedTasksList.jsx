// src/components/TasksList.jsx

import TaskItem from "@/components/TaskItem";

const CompletedTasksList = ({ tasks = [], onToggle, onUpdate, onDelete }) => {
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex flex-col listContainer gap-2">
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} aria-label="completed task">
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

export default CompletedTasksList;
