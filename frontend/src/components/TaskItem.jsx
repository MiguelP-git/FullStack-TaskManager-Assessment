import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit, onMarkInactive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Title is required");
      return;
    }
    if (title.length > 100) {
      alert("Title too long");
      return;
    }

    onEdit({ ...task, title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "12px 16px",
        marginBottom: "8px",
        borderRadius: "8px",
        backgroundColor: task.inactive
          ? "#e9a425"
          : task.completed
          ? "#6ae086"
          : "#b9b1b1",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        alignItems: "flex-start",
      }}
    >
      {/* Text Container / Edit Inputs */}
      <div style={{ flex: 1, textAlign: "left" }}>
        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "50%", padding: "4px 6px" }}
            />
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "50%", padding: "4px 6px" }}
            />
          </div>
        ) : (
          <>
            <strong
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#555" : "#222",
              }}
            >
              {task.title}
            </strong>
            <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "#666" }}>
              {task.description}
            </p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexShrink: 0,
          alignItems: "center",
          paddingTop: "14px",
        }}
      >
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#576ad8",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#aaa",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {!task.inactive && (
              <button
                onClick={() => onToggle(task)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: task.completed ? "#4caf50" : "#0ea333",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {task.completed ? "Completed" : "Mark Done"}
              </button>
            )}

            {!task.completed && !task.inactive && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#576ad8",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            )}

            {!task.inactive && (
              <button
                onClick={() => onMarkInactive(task)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#ff9800",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Mark Inactive
              </button>
            )}

            <button
              onClick={() => onDelete(task.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#f44336",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;