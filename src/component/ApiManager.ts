import axios, { AxiosError, AxiosResponse } from "axios";

// Define the base URL
const apiClient = axios.create({
  baseURL: "http://localhost:8080/sms-gateway",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response handling (optional: for specific transformations)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; // Directly return data for simplicity
  },
  (error: AxiosError) => {
    // Custom error handling logic
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Register function
export const register = async (
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiClient.post("/register", { user_id, password });
    return response; // Successfully registered
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Now we can safely access error.response or error.message
      throw new Error(
        `Registration failed: ${error.response?.data || error.message}`
      );
    }
    throw new Error("An unexpected error occurred during registration");
  }
};

// Login function
export const login = async (
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiClient.post("/login", { user_id, password });
    return response; // Successfully logged in
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      throw new Error(`Login failed: ${error.response?.data || error.message}`);
    }
    throw new Error("An unexpected error occurred during login");
  }
};

// Logout function
export const logout = async (): Promise<any> => {
  try {
    const response = await apiClient.delete("/logout");
    return response; // Successfully logged out
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      throw new Error(
        `Logout failed: ${error.response?.data || error.message}`
      );
    }
    throw new Error("An unexpected error occurred during logout");
  }
};
