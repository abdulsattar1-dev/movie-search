import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 MovieFinder
      </Link>
      <div className="nav-links">
        <Link to="/">Search</Link>
        <Link to="/favorites">❤️ Favorites ({favorites.length})</Link>
      </div>
    </nav>
  );
}

export default Navbar;