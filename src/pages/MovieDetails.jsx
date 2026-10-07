import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Something went wrong. Please check your internet.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) return <p className="status">Loading movie... ⏳</p>;
  if (error) return <p className="status error">{error}</p>;

  const liked = isFavorite(movie.imdbID);

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details">
        {movie.Poster !== "N/A" ? (
          <img src={movie.Poster} alt={movie.Title} className="details-poster" />
        ) : (
          <div className="no-poster big">🎬</div>
        )}

        <div className="details-info">
          <h1>{movie.Title}</h1>
          <p className="meta">
            {movie.Year} · {movie.Rated} · {movie.Runtime}
          </p>

          <div className="genres">
            {movie.Genre.split(", ").map((g) => (
              <span key={g} className="genre">
                {g}
              </span>
            ))}
          </div>

          <p className="imdb">
            ⭐ {movie.imdbRating} / 10 <span>IMDb</span>
          </p>

          <p className="plot">{movie.Plot}</p>

          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Language:</strong> {movie.Language}</p>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="ratings">
              {movie.Ratings.map((r) => (
                <div key={r.Source} className="rating-box">
                  <strong>{r.Value}</strong>
                  <span>{r.Source}</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn" onClick={() => toggleFavorite(movie)}>
            {liked ? "❤️ Remove from favorites" : "🤍 Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;