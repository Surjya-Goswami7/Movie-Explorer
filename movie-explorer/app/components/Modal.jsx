'use client';

export default function Modal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p>{movie.overview}</p>
        <p className="text-gray-600 mt-2">Release Date: {movie.release_date}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
}
