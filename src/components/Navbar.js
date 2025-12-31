// src/components/Navbar.js
// Navbar with Home, Favorites and Dark/Light mode toggle

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    if (!darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  };

  return (
    <nav className="navbar">
      {/* App Title */}
      <h2 className="nav-logo"> MovieApp</h2>

      {/* Navigation Links + Theme Toggle */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>

        {/* 🌙☀ Dark / Light Button */}
        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
