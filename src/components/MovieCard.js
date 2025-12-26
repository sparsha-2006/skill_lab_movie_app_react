import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
        />
        <h4>{movie.Title}</h4>
      </Link>
      <p>{movie.Year}</p>
    </div>
  );
}
