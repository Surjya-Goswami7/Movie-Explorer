'use client'

import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import MovieGrid from "./components/MovieGrid";
import Modal from "./components/Modal";

async function searchMovies(query){
  try {
    //console.log(`${BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(query)}`)

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=66649d9ec3ad3865db73d171ba23cba5&query=${encodeURIComponent(query)}`)

    return await response.json();
  } catch(error){
    console.error('Error fetching data in searchMovie', error)
    return []
  }
}

export default function Home() {
  const [query, setQuery] = useState('Spider');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null)

  function handleMovieClick(movie){
    setSelectedMovie(movie)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await searchMovies(query);
    setMovies(results.results)
     }
    fetchMovies();
  },[])


  function handleCloseModal(){
    setSelectedMovie(null)
  }
  
  async function handleSearch(e){
    e.preventDefault();
    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results.results)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold m-4">
          Movie Explorer
        </h1>
        <form onSubmit={handleSearch} className="m-8">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..." 
            className="px-4 py-2 w-80 bg-white text-black rounded"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
        </form>
        <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />
      </main>
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  )
}
