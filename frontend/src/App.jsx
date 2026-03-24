import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch all tasks (including inactive)
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD
  const addTask = async (task) => {
    try {
      await axios.post(`${API}/tasks`, task);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Error adding task");
    }
  };

  // TOGGLE completed
  const toggleTask = async (task) => {
    await axios.put(`${API}/tasks/${task.id}`, {
      ...task,
      completed: task.completed ? 0 : 1,
    });
    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  // MARK INACTIVE
  const markInactive = async (task) => {
    try {
      await axios.put(`${API}/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: task.completed,
        inactive: 1,
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to mark as inactive");
    }
  };

  // EDIT (inline edit from TaskItem)
  const editTask = async (task) => {
    // task contains {id, title, description, completed, inactive}
    if (!task.title || task.title.trim() === "") {
      alert("Title is required");
      return;
    }
    if (task.title.length > 100) {
      alert("Title too long");
      return;
    }

    try {
      await axios.put(`${API}/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: task.completed,
        inactive: task.inactive || 0,
      });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || "Error editing task");
    }
  };

  // SEARCH + FILTER
  const filteredTasks = tasks
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      switch (filter) {
        case "active":
          return t.completed === 0 && t.inactive !== 1;
        case "completed":
          return t.completed === 1 && t.inactive !== 1;
        case "inactive":
          return t.inactive === 1;
        default:
          return true; // all
      }
    });

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Management</h1>

      <TaskForm onAdd={addTask} />

      <hr />

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "6px",
            marginRight: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        onMarkInactive={markInactive} 
      />
    </div>
  );
}

export default App;