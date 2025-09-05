'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Modal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchTrailer() {
      if (!movie?.id) return;
      const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      });

      const data = await res.json();
      const trailer = data.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    }

    fetchTrailer();
  }, [movie]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Trailer OR Backdrop */}
          {trailerKey ? (
            <div className="relative">
              <iframe
                width="100%"
                height="350"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 md:h-80"
              ></iframe>
              <button
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-red-600 transition"
                onClick={onClose}
              >
                ✖
              </button>
            </div>
          ) : movie.backdrop_path ? (
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                width={780}
                height={400}
                className="w-full h-56 object-cover"
              />
              <button
                className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-red-600 transition"
                onClick={onClose}
              >
                ✖
              </button>
            </div>
          ) : null}

          {/* Content */}
          <div className="p-6">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {movie.title}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Release Date: {movie.release_date || "N/A"}
            </p>

            <p className="mt-4 text-gray-200 leading-relaxed">
              {movie.overview || "No description available."}
            </p>

            {/* Info Badges */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm">
                🎭 {movie.original_language?.toUpperCase()}
              </span>
            </div>

            {/* Close button bottom (for mobile) */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
