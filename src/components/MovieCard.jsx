import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(movie.imdbID);

  function handleHeart(e) {
    e.preventDefault();
    toggleFavorite(movie);
  }

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} loading="lazy" />
      ) : (
        <div className="no-poster">🎬</div>
      )}
      <button className="heart" onClick={handleHeart}>
        {liked ? "❤️" : "🤍"}
      </button>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>
          {movie.Year} · <span className="type">{movie.Type}</span>
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;