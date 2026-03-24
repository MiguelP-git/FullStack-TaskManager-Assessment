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
    <div>
      <h2>Add Task</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default TaskForm;