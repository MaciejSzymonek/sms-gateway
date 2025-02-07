import { useNavigate } from "react-router-dom";

export const AccessDenied = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login"); // This will navigate to the login page
  };

  return (
    <div className="m-4">
      <p>401: unathorized</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-3"
        onClick={toLogin}
      >
        Back to login?
      </button>
    </div>
  );
};
