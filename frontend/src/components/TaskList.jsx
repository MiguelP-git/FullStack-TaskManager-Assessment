import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit, onMarkInactive  }) {
  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
        onMarkInactive={onMarkInactive}
      />
      ))}
    </ul>
  );
}

export default TaskList;