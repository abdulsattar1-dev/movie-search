import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

async function fetchMovies(searchText, type, page) {
  const typePart = type ? `&type=${type}` : "";
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchText)}${typePart}&page=${page}`;
  const response = await fetch(url);
  return response.json();
}

function Home() {
  const [query, setQuery] = useState("batman");
  const [debouncedQuery, setDebouncedQuery] = useState("batman");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setMovies([]);
      setTotal(0);
      setError("Type at least 3 letters to search. ✍️");
      return;
    }

    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchMovies(debouncedQuery, type, 1);
        if (ignore) return;
        if (data.Response === "True") {
          setMovies(data.Search);
          setTotal(Number(data.totalResults));
          setPage(1);
        } else {
          setMovies([]);
          setTotal(0);
          setError(data.Error);
        }
      } catch (err) {
        if (!ignore) setError("Something went wrong. Please check your internet.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [debouncedQuery, type]);

  async function loadMore() {
    setLoadingMore(true);
    try {
      const data = await fetchMovies(debouncedQuery, type, page + 1);
      if (data.Response === "True") {
        setMovies((prev) => {
          const ids = new Set(prev.map((m) => m.imdbID));
          const newOnes = data.Search.filter((m) => !ids.has(m.imdbID));
          return [...prev, ...newOnes];
        });
        setPage(page + 1);
      }
    } finally {
      setLoadingMore(false);
    }
  }

  if (!API_KEY) {
    return <p className="status error">API key is missing. Add it to the .env.local file. 🔑</p>;
  }

  return (
    <div>
      <section className="search-hero">
        <h1>Find your next favorite movie 🍿</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
        </div>
      </section>

      {loading && <p className="status">Searching... ⏳</p>}
      {!loading && error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="result-count">
            Found {total} results for "{debouncedQuery}"
          </p>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {movies.length < total && (
            <div className="load-more-box">
              <button className="btn" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;