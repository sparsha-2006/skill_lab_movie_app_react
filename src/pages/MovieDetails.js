import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchDetails();
  }, [id]);

  if (!movie) return <h2 className="details">Loading...</h2>;

  const favorite = isFavorite(movie.imdbID);

  return (
    <div className="details">
      <h1>{movie.Title}</h1>

      <img
        src={movie.Poster !== "N/A" ? movie.Poster : ""}
        alt={movie.Title}
      />

      <p><b>Genre:</b> {movie.Genre}</p>
      <p><b>Runtime:</b> {movie.Runtime}</p>
      <p><b>IMDB Rating:</b> {movie.imdbRating}</p>
      <p><b>Actors:</b> {movie.Actors}</p>
      <p><b>Plot:</b> {movie.Plot}</p>

      <button
        onClick={() =>
          favorite
            ? removeFavorite(movie.imdbID)
            : addFavorite({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
              })
        }
      >
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
