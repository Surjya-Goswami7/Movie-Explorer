'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // modern icons

const navItems = [
  { href: "/", title: "Home" },
  { href: "/now-playing", title: "Now Playing" },
  { href: "/popular", title: "Popular" },
  { href: "/top-rated", title: "Top Rated" },
  { href: "/upcoming", title: "Upcoming" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeSidebar() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900/70 rounded-md text-white hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dark overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          🎬 Movie Explorer
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              onClick={closeSidebar}
              href={item.href}
              className="px-4 py-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
