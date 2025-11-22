import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    // Fetch all registered users
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));

    // Get logged-in user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="users-page">
      <h2 className="users-title">Registered Users</h2>

      {loggedUser && (
        <div className="logged-user-card">
          <h3>👋 Logged in as: {loggedUser.name}</h3>
          <p><b>Email:</b> {loggedUser.email}</p>
          <p><b>Role:</b> {loggedUser.role}</p>
        </div>
      )}

      <div className="user-cards-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
