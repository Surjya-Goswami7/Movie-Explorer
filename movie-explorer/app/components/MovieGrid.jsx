'use client';

import Image from "next/image";

export default function MovieGrid({ movies, handleMovieClick }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-gray-400 text-center text-lg mt-8">
        No movies found 🎬
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleMovieClick(movie)}
          className="group relative rounded-xl overflow-hidden shadow-lg bg-gray-800/40 backdrop-blur-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Poster */}
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "/no-image.jpg"
            }
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-80 object-cover transition group-hover:opacity-90"
          />

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
            <h2 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-blue-400">
              {movie.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
            <span className="mt-1 inline-block px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-lg">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
