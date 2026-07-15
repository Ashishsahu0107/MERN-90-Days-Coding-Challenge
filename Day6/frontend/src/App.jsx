import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [view, setView] = useState("login"); // 'login' or 'register'

  const handleLoginSuccess = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setView("login");
  };

  const handleRegisterSuccess = () => {
    setView("login");
  };

  return (
    <div className="app-container">
      {token && user ? (
        <Dashboard user={user} token={token} onLogout={handleLogout} />
      ) : view === "login" ? (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onToggleView={() => setView("register")}
        />
      ) : (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onToggleView={() => setView("login")}
        />
      )}
    </div>
  );
}
