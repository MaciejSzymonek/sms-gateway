import { useNavigate } from "react-router-dom";
import { logout } from "./ApiManager";
const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout(); // Await if logout is async
      console.log("Logging out...");
      localStorage.removeItem("AccessToken"); // Remove the access token from localStorage
      navigate("/"); // Redirect to the login page
      console.log(response.data); // Optionally log the response from logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show a message to the user
      alert("Logout failed. Please try again.");
    }
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
