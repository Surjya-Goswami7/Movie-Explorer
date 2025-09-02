'use client'

import Image from "next/image";

export default function MovieCard({ movie, onClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  const truncatedTitle =
    movie.title.length > 25 ? movie.title.substring(0, 25) + "..." : movie.title;

  return (
    <div
      className="cursor-pointer group w-44 sm:w-56 md:w-64"
      onClick={() => onClick(movie)}
    >
      {/* Card Container */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        {/* Poster */}
        <Image
          src={imageUrl}
          alt={truncatedTitle}
          width={300}
          height={450}
          className="object-cover w-full h-full"
        />

        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white text-sm sm:text-base font-semibold truncate group-hover:text-blue-400">
            {truncatedTitle}
          </h3>
        </div>
      </div>

      {/* Title below (optional extra display) */}
      <h3 className="text-gray-200 text-sm sm:text-base mt-2 truncate">
        {truncatedTitle}
      </h3>
    </div>
  );
}
