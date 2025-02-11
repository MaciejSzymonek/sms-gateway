import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../component/ApiManager";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Ensure theme is applied on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const Kurwa = async () => {
    const response = verify();
    if ((await response).success) {
      navigate("/tables");
    } else {
      navigate("/login"); // This will navigate to the register page
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-blue-300 dark:bg-gray-800 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Left Button */}
          <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition">
            Login In
          </button>

          {/* Center Buttons */}
          <div className="hidden md:flex gap-4">
            <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition">
              Home
            </button>
            <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition">
              About
            </button>
            <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition">
              Services
            </button>
            <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition">
              Contact
            </button>
          </div>

          {/* Right Button (Dark Mode Toggle) */}
          <button
            className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition"
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
          </button>

          {/* Mobile Menu (Hamburger) */}
          <div className="md:hidden">
            <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 dark:hover:bg-gray-700 transition">
              ☰
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
