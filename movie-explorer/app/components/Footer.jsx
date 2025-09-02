// components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-10 pb-6 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-white tracking-wide">
            🎬 Movie Explorer
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wide">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/category/popular" className="hover:text-white transition">Popular</a>
            <a href="/category/top_rated" className="hover:text-white transition">Top Rated</a>
            <a href="/category/upcoming" className="hover:text-white transition">Upcoming</a>
    
          </nav>

          {/* Social Links */}
          <div className="flex gap-5 text-lg">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Movie Explorer. All Rights Reserved.  
        </div>
      </div>
    </footer>
  );
}
