import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the types for the props

interface LoginPageProps {
  onLogin: (user_id: string, password: string) => void; // Function to handle login
  error: string; // Error message passed from parent
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [user_id, setUser_id] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register"); // This will navigate to the register page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(user_id, password); // Call the function passed from the parent
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-4 shadow-lg bg-white rounded-lg">
        <h2 className="text-center mb-4 text-xl font-semibold">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <button
          onClick={goToRegister}
          className="mt-4 p-3 bg-green-500 text-white rounded-md w-full hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
