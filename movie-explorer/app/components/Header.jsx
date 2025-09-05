"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/category/top_rated", label: "⭐ Top Rated" },
  { href: "/category/upcoming", label: "🎟️ Upcoming" },
  { href: "/category/popular", label: "🔥 Popular" },
  { href: "/category/now_playing", label: "🎬 Now Playing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Film size={28} className="text-yellow-400" />
          <h1 className="text-2xl font-extrabold tracking-wide">
            Movie <span className="text-yellow-400">Explorer</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-md hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown with Animation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col space-y-4 px-6 pb-6 mt-4 bg-gray-900 border-t border-gray-700 rounded-lg shadow-lg"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-md hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300 text-center"
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
