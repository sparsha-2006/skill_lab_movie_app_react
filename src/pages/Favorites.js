import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <h2>My Favorites</h2>

      {favorites.length === 0 && <p>No favorites yet</p>}

      <div className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
