import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDarkMode } from "../context/toggleTheme";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const token = localStorage.getItem("token");
  const inputRef = useRef();

  useEffect(() => {
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tasks, selectedIndex]);

  useEffect

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  useEffect(() => {
fetchTasks()
  }, []);

  const fetchTasks = async () => {

    const response = await axios.get("http://localhost:5000/tasks/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(response.data);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    const response = await axios.post(
      "http://localhost:5000/tasks/",
      { title: newTask },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  const handleComplete = async (id) => {
    await axios.patch(
      `http://localhost:5000/tasks/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleKeyDown = (e) => {
    if (document.activeElement === inputRef.current) {
      if (e.key === "Enter") {
        handleAdd();
      } else if (e.key === "Escape") {
        setNewTask("");
      }
      return;
    }

    if (tasks.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) =>
          prev === null || prev === tasks.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        setSelectedIndex((prev) =>
          prev === null || prev === 0 ? tasks.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (selectedIndex !== null) {
          handleComplete(tasks[selectedIndex].id);
        }
        break;
      case "Delete":
        if (selectedIndex !== null) {
          handleDelete(tasks[selectedIndex].id);
        }
        break;
      case "Escape":
        setSelectedIndex(null);
        break;
      default:
        break;
    }
  };

  const themeStyles = {
    background: darkMode ? "#121212" : "#f9f9f9",
    color: darkMode ? "#eee" : "#333",
    cardBackground: darkMode ? "#1e1e1e" : "#fff",
    inputBorder: darkMode ? "#444" : "#ccc",
    taskBackground: darkMode ? "#2a2a2a" : "#fff",
    selected: darkMode ? "#37474f" : "#e0f7fa",
    outline: darkMode ? "#80deea" : "#00acc1",
  };

  return (
    <div
      style={{
        background: themeStyles.background,
        color: themeStyles.color,
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "60px 20px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: themeStyles.cardBackground,
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ margin: 0, fontWeight: "600", fontSize: "28px" }}>📝 My Tasks</h2>
          <button
            onClick={toggleDarkMode}
            style={{
              fontSize: "22px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: themeStyles.color,
              transition: "color 0.3s",
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
  
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 16px",
              border: `1px solid ${themeStyles.inputBorder}`,
              borderRadius: "8px",
              fontSize: "16px",
              backgroundColor: darkMode ? "#2b2b2b" : "#fafafa",
              color: themeStyles.color,
              transition: "border-color 0.3s",
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: "14px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              fontWeight: "500",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            ➕
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "14px 20px",
              backgroundColor: "#f44336",
              color: "#fff",
              fontWeight: "500",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            🔓
          </button>
        </div>
  
        <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
          {tasks.map((task, index) => (
            <li
              key={task.id}
              style={{
                backgroundColor:
                  selectedIndex === index ? themeStyles.selected : themeStyles.taskBackground,
                padding: "18px 22px",
                marginBottom: "12px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "background 0.3s ease",
                outline:
                  selectedIndex === index ? `2px solid ${themeStyles.outline}` : "none",
              }}
            >
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#aaa" : themeStyles.color,
                  fontSize: "16px",
                  flex: 1,
                  transition: "color 0.3s ease",
                }}
              >
                {task.title}
              </span>
              <button
                onClick={() => handleComplete(task.id)}
                title="Mark as Complete"
                style={{
                  backgroundColor: "#2196F3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginLeft: "12px",
                  transition: "background-color 0.3s",
                }}
              >
                ✔
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                title="Delete Task"
                style={{
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  marginLeft: "8px",
                  transition: "background-color 0.3s",
                }}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default TasksPage;
