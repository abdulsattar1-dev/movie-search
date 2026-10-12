# 🎬 Movie Search App

Search millions of movies and TV series, see full details, and save your favorites.

**🔗 Live demo:** https://movie-search-hznm.vercel.app

## ✨ Features
- Live search with **debounce** (waits until you stop typing)
- Filter by type: movies or series
- **Load more** button for more results
- Movie details page: plot, rating, cast and more
- Add / remove **favorites** — saved in the browser
- Multi-page app with React Router

## 🧠 What I learned
- React Router: routes, URL params (`/movie/:id`), links
- Context API to share favorites across pages
- Debouncing a search input with `useEffect` and `setTimeout`
- Pagination with an API
- Keeping an API key in an `.env` file

## 🛠️ Run it on your computer
```bash
git clone https://github.com/abdulsattarnangri7-desktoop/movie-search.git
cd movie-search
npm install
# Create a .env file with your free OMDb key (omdbapi.com/apikey.aspx):
# VITE_OMDB_KEY=your_key_here
npm run dev
```
Then open http://localhost:5173

## 📦 Built with
React 19 · Vite · React Router · Context API · OMDb API · localStorage

## 👤 Author
**Abdul Sattar** — WordPress & React Developer
[GitHub](https://github.com/abdulsattarnangri7-desktoop) · [Portfolio](http://abdulsattarportfolio.free.nf)
