import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/Login"); // Redirect to Login page
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOut;
