import React, { useState } from "react";

export default function Register({ onRegisterSuccess, onToggleView }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register.");
      }

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        onRegisterSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">Join Us</h2>
        <p className="card-subtitle">Create your admin manager account</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="register-name">
            Full Name
          </label>
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="text"
              id="register-name"
              required
              placeholder="Ashish"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-email">
            Email Address
          </label>
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="email"
              id="register-email"
              required
              placeholder="ashish@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-password">
            Password
          </label>
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="password"
              id="register-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </form>

      <div className="auth-switch">
        Already have an account?{" "}
        <button type="button" className="auth-link" onClick={onToggleView}>
          Sign In
        </button>
      </div>
    </div>
  );
}
