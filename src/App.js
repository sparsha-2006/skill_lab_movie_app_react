import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  const [dark, setDark] = useState(false);

  // Load preference
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") setDark(true);
  }, []);

  // Save preference
  useEffect(() => {
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar />

      {/* Dark Mode Toggle */}
      <div style={{ textAlign: "center", margin: "10px" }}>
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
