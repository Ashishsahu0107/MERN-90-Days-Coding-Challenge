import React, { useState, useEffect } from "react";

export default function Dashboard({ user, token, onLogout }) {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");

  // Add user form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  const fetchUsers = async () => {
    setListError("");
    try {
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load user list.");
      }

      setUsersList(data);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user.");
      }

      setAddSuccess("User created successfully!");
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      fetchUsers();

      setTimeout(() => {
        setAddSuccess("");
      }, 2000);
    } catch (err) {
      setAddError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm(`Are you sure you want to delete user ID ${id}?`)) {
      return;
    }

    setListError("");
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user.");
      }

      fetchUsers();
    } catch (err) {
      setListError(err.message);
    }
  };

  const initial = user && user.name ? user.name.charAt(0).toUpperCase() : "M";

  return (
    <div className="dashboard-container">
      {/* Header Area */}
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome, {user?.name || "Manager"}</h1>
          <p>Manage system users and access configurations.</p>
        </div>
        <div className="user-badge">
          <div className="user-avatar">{initial}</div>
          <button className="btn btn-secondary logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Add New User Form */}
        <section className="panel-card">
          <h3 className="panel-title">Add Database User</h3>

          {addError && <div className="alert alert-danger">{addError}</div>}
          {addSuccess && (
            <div className="alert alert-success">{addSuccess}</div>
          )}

          <form onSubmit={handleAddUser}>
            <div className="form-group">
              <label className="form-label" htmlFor="new-name">
                Full Name
              </label>
              <input
                className="form-input"
                type="text"
                id="new-name"
                required
                placeholder="E.g. Ashish Sahu"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new-email">
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                id="new-email"
                required
                placeholder="E.g. ashish@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new-password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="new-password"
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Create User
            </button>
          </form>
        </section>

        {/* Right Column: User Database Table */}
        <section className="panel-card">
          <h3 className="panel-title">System User Database</h3>

          {listError && <div className="alert alert-danger">{listError}</div>}

          <div className="users-table-container">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                Loading user database...
              </div>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td className="action-buttons">
                        <button
                          className="btn btn-danger action-btn"
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {usersList.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>
                        No users registered in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
