import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdLogout } from "react-icons/md"; // Import the icons
import { useNavigate } from "react-router-dom";
import { logout } from "./ApiManager";

interface HeaderProps {
  title: string; // The title prop that will be passed to the header
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const back = () => {
    navigate("/tables");
  };

  const handleLogout = async () => {
    try {
      await logout(); // Await if logout is async
      localStorage.removeItem("AccessToken"); // Remove the access token from localStorage
      navigate("/login"); // Redirect to the login page
      // // Optionally log the response from logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show a message to the user
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="relative h-[96px] bg-gray-500 flex items-center justify-center px-4">
      {/* Logout Button in the Top-Left */}
      <button
        onClick={back}
        className="absolute top-0 left-0 h-full w-[96px] bg-red-500 text-white hover:bg-red-700 transition duration-300 flex items-center justify-center"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Title in the Center */}
      <h1 className="text-3xl font-bold text-white">{title}</h1>

      {/* Settings Button in the Top-Right */}
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 h-full w-[96px] bg-red-500 text-white hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        <MdLogout className="text-2xl" />
      </button>
    </header>
  );
};

export default Header;
