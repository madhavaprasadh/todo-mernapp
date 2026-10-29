import { useEffect, useState } from "react";
import axios from "axios";
import "./Todos.css";
import React from "react";
const API_URL = "http://localhost:4000/api/todos";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setError("");

      const response = await axios.post(API_URL, {
        title: title.trim(),
      });

      setTodos((prev) => [...prev, response.data.todo]);
      setTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create todo");
    }
  };

  const updateTodo = async (id) => {
    if (!editTitle.trim()) return;

    try {
      setError("");

      const { data } = await axios.put(`${API_URL}/${id}`, {
        title: editTitle.trim(),
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? data.todo : todo)),
      );

      setEditId(null);
      setEditTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo");
    }
  };

  const toggleTodo = async (todo) => {
    try {
      setError("");

      const response = await axios.put(`${API_URL}/${todo.id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((item) => (item.id === todo.id ? response.data.todo : item)),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      if (editId === id) {
        setEditId(null);
        setEditTitle("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete todo");
    }
  };

  const startEditing = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditTitle("");
  };

  if (loading) {
    return <p className="status">Loading todos...</p>;
  }

  return (
    <main className="app">
      <section className="todo-card">
        <h1>My Todo List</h1>
        <p className="subtitle">Plan your day, one task at a time.</p>

        <form className="add-form" onSubmit={addTodo}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
            aria-label="New todo title"
          />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="todo-header">
          <h2>Your tasks</h2>
          <span>{todos.length} total</span>
        </div>

        {todos.length === 0 ? (
          <p className="empty">No todos yet. Add your first task!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                {editId === todo.id ? (
                  <form
                    className="edit-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateTodo(todo.id);
                    }}
                  >
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      aria-label="Edit todo title"
                    />
                    <button type="submit" className="save">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <label className="todo-label">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo)}
                      />
                      <span className={todo.completed ? "completed" : ""}>
                        {todo.title}
                      </span>
                    </label>

                    <div className="actions">
                      <button
                        className="edit"
                        onClick={() => startEditing(todo)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="footer">
          {todos.filter((todo) => todo.completed).length} of {todos.length}{" "}
          tasks completed
        </p>
      </section>
    </main>
  );
}
