// app/category/[type]/page.jsx
import React from "react";

async function getMovies(type) {
  const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status}`);
  }

  return res.json();
}

export default async function CategoryPage({ params }) {
  const { type } = params;
  const data = await getMovies(type);

  return (
    <div className="px-6 py-10 bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold capitalize text-white mb-8">
        {type.replace("_", " ")} Movies
      </h1>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.results?.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {/* Poster */}
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Info */}
            <div className="p-3">
              <h2 className="text-lg font-semibold text-white truncate">
                {movie.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                ⭐ {movie.vote_average?.toFixed(1)} | 📅{" "}
                {movie.release_date?.slice(0, 4)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
