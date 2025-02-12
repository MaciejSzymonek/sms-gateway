import { useNavigate } from "react-router-dom";
import { logout } from "./ApiManager";
import { MdOutlineLogin } from "react-icons/md";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout(); // Await if logout is async
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
    <div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-600"
        onClick={handleLogout}
      >
        <MdOutlineLogin />
      </button>
    </div>
  );
};

export default LogOut;
