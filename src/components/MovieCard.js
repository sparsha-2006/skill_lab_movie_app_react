import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="movie-card">
        <div className="movie-poster">
          <img src={poster} alt={movie.Title} />
        </div>

        <div className="movie-card-content">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
}

