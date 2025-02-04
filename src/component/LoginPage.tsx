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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "24rem",
          padding: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
            }}
          >
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            required
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.75rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <button
          onClick={goToRegister}
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
