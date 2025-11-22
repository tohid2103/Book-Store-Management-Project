import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">📚 BookStore</div>
      <ul className="navbar-links">
        {loggedUser ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/addbook">Add Book</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/cart">🛒 Cart</Link></li>
            <li><Link to="/issue-return">Issue & Return</Link></li>
            <li className="navbar-user">👋 {loggedUser.name || "User"}</li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
