import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const RECOMMENDED_TERMS = [
  "Avengers",
  "Harry Potter",
  "Batman",
  "Star Wars",
  "Jurassic"
];

export default function Home() {
  const [recommended, setRecommended] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // FETCH RECOMMENDATIONS
  
  const fetchRecommendations = async () => {
    try {
      const term =
        RECOMMENDED_TERMS[
          Math.floor(Math.random() * RECOMMENDED_TERMS.length)
        ];

      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`
      );

      setRecommended(res.data.Search || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

 
  // SEARCH MOVIES
  
  const handleSearch = async (term) => {
    try {
      setSearchTerm(term);
      setPage(1);

      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}&page=1`
      );

      setMovies(res.data.Search || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title"> Movie App</h1>
      <p className="page-subtitle">Search and explore movies</p>

      {/* SEARCH BAR */}
      <SearchBar onSearch={handleSearch} />

      {/* 
          RECOMMENDATIONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px"
        }}
      >
        <h2> Recommended Movies</h2>
        <button onClick={fetchRecommendations}>
          🔄 Refresh Recommendations
        </button>
      </div>

      <div className="movie-grid">
        {recommended.map((movie) => (
          <MovieCard
            key={`rec-${movie.imdbID}`}   //  UNIQUE KEY
            movie={movie}
          />
        ))}
      </div>

      {/* 
          SEARCH RESULTS */}
      {movies.length > 0 && (
        <>
          <h2 style={{ marginTop: "40px" }}>🔍 Search Results</h2>

          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={`search-${movie.imdbID}`} //  UNIQUE KEY
                movie={movie}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
