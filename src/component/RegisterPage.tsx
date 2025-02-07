import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCall, storePassword } from "./ApiManager";

const RegisterPage = () => {
  const [user_id, setUser_id] = useState("");
  const [user_name, setUser_name] = useState("");
  const [customer_id, setCustomer_id] = useState(0);
  const [user_phonenumber, setUser_Phonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // Track if we are redirecting
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setSuccess(false); // Clear success message

    // Validation logic
    if (
      !user_id ||
      !user_name ||
      !customer_id ||
      !user_phonenumber ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userDetails = {
      user_id,
      user_name,
      customer_id,
      user_phonenumber,
      user_role: "user",
      user_is_active: true,
    };

    try {
      setLoading(true);
      // Attempt to register
      const response = await registerCall("user", userDetails);
      const response2 = await storePassword(user_id, password);

      if (response.success && response2.success) {
        // If successful, show success message
        setSuccess(true);
        // Then, show the redirecting message and spinner
        setTimeout(() => {
          setRedirecting(true); // Enable the redirecting state
          setTimeout(() => {
            window.location.replace(
              window.location.protocol + "//" + window.location.host + "/login"
            );
          }, 500); // Add a slight delay to show redirect spinner before actually redirecting
        }, 1000); // Delay the redirecting message for 1 second (adjust as needed)
      } else {
        // Handle error response (display message)
        setError(response.message || "An error occurred during registration.");
      }
    } catch (err: any) {
      // If something goes wrong during the request
      setError(
        "An unexpected error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
        {/* Full-page loader when redirecting */}
        {redirecting && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-16 w-16"></div>
            <span className="text-white ml-4">Redirecting...</span>
          </div>
        )}

        <h2 className="text-center mb-4 text-xl font-semibold">Register</h2>

        {/* Display error or success messages */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && !redirecting && (
          <p className="text-green-500 text-sm mb-2">
            Registration successful!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during loading
          />
          <input
            type="text"
            placeholder="Username"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during loading
          />
          <input
            type="text"
            placeholder="Company id"
            value={customer_id}
            onChange={(e) => setCustomer_id(Number(e.target.value))}
            required
            className="p-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during loading
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={user_phonenumber}
            onChange={(e) => setUser_Phonenumber(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during loading
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during loading
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
            disabled={loading} // Disable input during loading
          />
          <button
            type="submit"
            className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            disabled={loading} // Disable the button during loading
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full border-t-2 border-b-2 border-white h-5 w-5 mr-2"></div>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="p-3 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600 transition"
            disabled={loading} // Disable button during loading
          >
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
