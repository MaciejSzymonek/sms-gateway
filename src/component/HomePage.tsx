import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const Kurwa = () => {
    navigate("/login"); // This will navigate to the register page
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Startsidan</h1>
      <button onClick={Kurwa}>ashdlsalf </button>
    </div>
  );
};

export default HomePage;
