import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<h1>Page not found 😕</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;