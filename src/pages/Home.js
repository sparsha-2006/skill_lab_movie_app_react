// src/pages/Home.js
// Home page: Search movies + Pagination + Responsive grid

import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch movies from OMDb API with pagination
  const fetchMovies = async (search, pageNo = 1) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${pageNo}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // When user searches a movie
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    fetchMovies(term, 1);
  };

  // Go to next page
  const nextPage = () => {
    const next = page + 1;
    setPage(next);
    fetchMovies(searchTerm, next);
  };

  // Go to previous page
  const prevPage = () => {
    if (page > 1) {
      const prev = page - 1;
      setPage(prev);
      fetchMovies(searchTerm, prev);
    }
  };

  return (
    <div>
      {/* Home Page Heading */}
      <h1 style={{ textAlign: "center" }}>Search Movies 🎬</h1>
      <p style={{ textAlign: "center", color: "gray" }}>
        Find movies and manage your favorites
      </p>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Movie Cards Grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      {movies.length > 0 && (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <button onClick={prevPage} disabled={page === 1}>
            ⬅ Previous
          </button>

          <span style={{ margin: "0 15px", fontWeight: "bold" }}>
            Page {page}
          </span>

          <button onClick={nextPage}>
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
