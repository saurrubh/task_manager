import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/toggleTheme";

const SignUpLoginPage = () => {
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const { darkMode, toggleDarkMode } = useDarkMode();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        new URLSearchParams({ username, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/tasks"), 1000);
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/signup`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Signup successful! Please log in.");
      setUsername("");
      setPassword("");
      setIsSignup(false); // Switch back to login form
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError("");
    setSuccess("");
    setUsername("");
    setPassword("");
  };

  return (
    <div
      style={{
        ...styles.page,
        background: darkMode
          ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(to right, #e0eafc, #cfdef3)",
      }}
    >
      <div
        style={{
          ...styles.card,
          backgroundColor: darkMode ? "rgba(34, 34, 34, 0.9)" : "rgba(255, 255, 255, 0.9)",
          color: darkMode ? "#f1f1f1" : "#2c3e50",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ marginBottom: "10px", textAlign: "right" }}>
          <button onClick={toggleDarkMode} style={styles.toggle}>
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
        <h2 style={{ marginBottom: "25px", fontSize: "26px", fontWeight: "600" }}>
          {isSignup ? "📝 Create Account" : "🔐 Welcome Back"}
        </h2>

        <form onSubmit={isSignup ? handleSignup : handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? (isSignup ? "Signing up..." : "Logging in...") : (isSignup ? "Signup" : "Login")}
          </button>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={toggleForm}
            style={{
              ...styles.toggle,
              marginLeft: "5px",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            {isSignup ? "Login" : "Signup"}
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    transition: "all 0.4s ease-in-out",
  },
  card: {
    padding: "40px 35px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    transition: "all 0.3s ease-in-out",
  },
  input: {
    padding: "14px 16px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#fff",
    transition: "box-shadow 0.2s ease",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
  },
  button: {
    padding: "14px",
    fontSize: "16px",
    fontWeight: "500",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease",
  },
  error: {
    color: "#c62828",
    background: "#ffebee",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    color: "#2e7d32",
    background: "#e8f5e9",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  toggle: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "inherit",
    transition: "color 0.3s ease",
  },
};

export default SignUpLoginPage;