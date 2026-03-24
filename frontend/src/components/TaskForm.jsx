import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // VALIDATION
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
    setError("description is required");
    return;
    }
    if (title.length > 100) {
      setError("Title must not exceed 100 characters");
      return;
    }
    if (!description.trim()) {
      setError("description is required");
      return;
    }
    if (description.length > 300) {
      setError("Description must not exceed 300 characters");
      return;
    }

    onAdd({ title, description });

    setTitle("");
    setDescription("");
    setError("");
  };

  return (
<div style={{padding: "50px"}}>
  <h2>Add Task</h2>

  {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}

  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{
      width: "50%",
      padding: "8px 12px",
      marginBottom: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      outline: "none",
    }}
  />

  <textarea
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    style={{
      width: "50%",
      padding: "8px 12px",
      marginBottom: "12px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      outline: "none",
    }}
  />

  <button
    onClick={handleSubmit}
    style={{
      width: "52%",
      padding: "10px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#576ad8",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "1rem",
    }}
  >
    Add
  </button>
</div>
  );
}

export default TaskForm;