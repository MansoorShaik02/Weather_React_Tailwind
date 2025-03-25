import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons for menu toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold text-red-500">WeatherApp</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-red-400 transition-colors ${
                  isActive ? "text-red-500" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/weather-forecast"
              className={({ isActive }) =>
                `hover:text-red-400 transition-colors ${
                  isActive ? "text-red-500" : ""
                }`
              }
            >
              Weather Forecast
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 space-y-4 py-4 text-center">
          <NavLink
            to="/"
            className="block hover:text-red-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/weather-forecast"
            className="block hover:text-red-400"
            onClick={() => setIsOpen(false)}
          >
            Weather Forecast
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
