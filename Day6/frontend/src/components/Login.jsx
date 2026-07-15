import React, { useState } from "react";

export default function Login({ onLoginSuccess, onToggleView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in.");
      }

      onLoginSuccess(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">Welcome Back</h2>
        <p className="card-subtitle">Sign in to your restaurant dashboard</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">
            Email Address
          </label>
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="email"
              id="login-email"
              required
              placeholder="ashish@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            Password
          </label>
          <div className="form-input-wrapper">
            <input
              className="form-input"
              type="password"
              id="login-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Sign In
        </button>
      </form>

      <div className="auth-switch">
        Don't have an account?{" "}
        <button type="button" className="auth-link" onClick={onToggleView}>
          Create Account
        </button>
      </div>
    </div>
  );
}
