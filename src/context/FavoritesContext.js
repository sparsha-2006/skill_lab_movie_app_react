import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites"));
    if (stored) setFavorites(stored);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    if (!favorites.some(m => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(m => m.imdbID !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(m => m.imdbID === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
