import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="empty">
        <h1>No favorites yet 💔</h1>
        <p>Click the 🤍 on any movie to save it here.</p>
        <Link to="/" className="btn">
          Search movies
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">❤️ My Favorites ({favorites.length})</h1>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;