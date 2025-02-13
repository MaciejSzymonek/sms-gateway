import { useNavigate } from "react-router-dom";
import { logout } from "./ApiManager";
import { MdLogout } from "react-icons/md";

const LogOut = () => {
  const navigate = useNavigate();

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
    <div className="content-end">
      <button
        className="bg-red-500 w- text-white px-4 py-3 rounded-md mb-4 hover:bg-red-600"
        onClick={handleLogout}
      >
        <MdLogout />
      </button>
    </div>
  );
};

export default LogOut;
