const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Database("tasks.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER DEFAULT 0,
    inactive INTEGER DEFAULT 0
  )
`).run();

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Description is required" });
  }
  if (title.length > 100) {
    return res.status(400).json({ error: "Title too long" });
  }

  const stmt = db.prepare(
    "INSERT INTO tasks (title, description, inactive) VALUES (?, ?, 0)"
  );
  const result = stmt.run(title, description || "");
  res.json({ id: result.lastInsertRowid });
});

app.get("/tasks", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();
  res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
  const { title, description, completed, inactive } = req.body;
  const { id } = req.params;

  const task = db.prepare("SELECT * FROM tasks WHERE id=?").get(id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  db.prepare(`
    UPDATE tasks
    SET title=?, description=?, completed=?, inactive=?
    WHERE id=?
  `).run(
    title ?? task.title,
    description ?? task.description,
    completed ?? task.completed,
    inactive ?? task.inactive, 
    id
  );

  res.json({ message: "Task updated" });
});

app.delete("/tasks/:id", (req, res) => {
  const result = db.prepare("DELETE FROM tasks WHERE id=?").run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});