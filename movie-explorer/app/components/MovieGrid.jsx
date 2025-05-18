'use client';

export default function MovieGrid({ movies, handleMovieClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className="bg-gray-800 p-4 rounded hover:cursor-pointer hover:bg-gray-700"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
