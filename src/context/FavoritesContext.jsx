import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((movie) => movie.imdbID === id);
  }

  function toggleFavorite(movie) {
    if (isFavorite(movie.imdbID)) {
      setFavorites((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
    } else {
      setFavorites((prev) => [
        ...prev,
        {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
          Type: movie.Type,
        },
      ]);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}