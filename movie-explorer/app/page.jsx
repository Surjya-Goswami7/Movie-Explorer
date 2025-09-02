'use client'

import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import MovieGrid from "./components/MovieGrid";
import Modal from "./components/Modal";

async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=66649d9ec3ad3865db73d171ba23cba5&query=${encodeURIComponent(query)}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data in searchMovie", error);
    return [];
  }
}

export default function Home() {
  const [query, setQuery] = useState("Spider");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await searchMovies(query);
      setMovies(results.results);
    };
    fetchMovies();
  }, []);

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results.results);
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold m-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          🎬 Movie Explorer
        </h1>

        {/* Search Bar */}
       <form
  onSubmit={handleSearch}
  className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md bg-white/10 backdrop-blur-md p-2 rounded-lg shadow-md"
>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search movies..."
    className="flex-1 px-2 py-1 text-sm rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
  />
  <button
    type="submit"
    className="px-4 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 rounded-md shadow hover:scale-105 transition-transform duration-200"
  >
    Search
  </button>
</form>



        {/* Movie Grid */}
        <div className="mt-10 w-full max-w-6xl">
          <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />
        </div>
      </main>

      {/* Modal */}
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}
