import React, { useState } from "react";
import axios from "axios";
import LoginPage from "./LoginPage"; // Assuming LoginPage is the child component

const Haha = () => {
  const [error, setError] = useState("");

  // Handle the login submission logic
  const handleLogin = async (user_id: string, password: string) => {
    try {
      if (!user_id || !password) {
        setError("Please fill in all fields.");
        return;
      }

      setError("");

      const response = await axios.post(
        "http://localhost:8080/sms-gateway/login",
        {
          user_id,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", response.data);
      // Add any additional logic here if necessary, such as navigation
      // navigate('/dashboard'); or perform other actions.
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          setError("A user with this ID does not exist.");
        } else if (statusCode === 401) {
          setError("Bad credentials.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        console.error("Network Error:", error);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return <LoginPage onLogin={handleLogin} error={error} />;
};

export default Haha;
