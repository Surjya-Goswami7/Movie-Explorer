"use client";

import { useState } from "react";
import { Menu, X, Film } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Film size={28} className="text-yellow-400" />
          <h1 className="text-2xl font-extrabold tracking-wide">
            Movie <span className="text-yellow-400">Explorer</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <a href="/category/top_rated" className="hover:text-yellow-400 transition">
            ⭐ Top Rated
          </a>
          <a href="/category/upcoming" className="hover:text-yellow-400 transition">
            🎟️ Upcoming
          </a>
          <a href="/category/popular" className="hover:text-yellow-400 transition">
            🔥 Popular
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <nav className="md:hidden flex flex-col space-y-4 px-6 pb-6 bg-gray-900 border-t border-gray-700 animate-slideDown">
          <a href="/category/top_rated" className="hover:text-yellow-400 transition">
            ⭐ Top Rated
          </a>
          <a href="/category/upcoming" className="hover:text-yellow-400 transition">
            🎟️ Upcoming
          </a>
          <a href="/category/popular" className="hover:text-yellow-400 transition">
            🔥 Popular
          </a>
        </nav>
      )}
    </header>
  );
}
