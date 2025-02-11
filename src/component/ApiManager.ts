import axios, { AxiosError, AxiosResponse } from "axios";
import { UserParams, CustomerParams } from "./types"; // Adjust the path based on where your types are located

// Define the base URL
const apiBackend = axios.create({
  baseURL: "http://localhost:8080/sms-gateway",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiGui = axios.create({
  baseURL: "http://localhost:8080/GUIApi",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authorization header to requests (except login and register)
apiGui.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccessToken");

  if (
    token &&
    !config.url?.includes("login") &&
    !config.url?.includes("register")
  ) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiBackend.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccessToken");

  if (
    token &&
    !config.url?.includes("login") &&
    !config.url?.includes("register")
  ) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response handling (optional: for specific transformations)
apiBackend.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const readCall = async (
  destination: string,
  id: string
): Promise<any> => {
  try {
    const response = await apiGui.get(`/${destination}/${id}`);
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, destination);
  }
};

// Register function

type RegisterParams = UserParams | CustomerParams;

export const registerCall = async (
  destination: string,
  params: RegisterParams
): Promise<any> => {
  try {
    const response = await apiGui.post(`/${destination}/`, params);
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, "registration");
  }
};

export const updateCall = async (
  destination: string,
  params: RegisterParams
): Promise<any> => {
  try {
    // Dynamically construct the URL based on destination and params type
    let url: string;
    if (destination === "user" && "user_id" in params) {
      // Handle the "user" destination and ensure user_id is available
      url = `/${destination}/${params.user_id}`;
    } else if (destination === "customer" && "customer_id" in params) {
      // Handle the "customer" destination and ensure customer_id is available
      url = `/${destination}/${params.customer_id}`;
    } else {
      // Throw an error if user_id or customer_id is missing
      throw new Error(`Missing required ID for ${destination}`);
    }

    // Perform the PATCH request
    const response = await apiGui.patch(url, params);
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, "registration");
  }
};

export const deleteCall = async (
  destination: string,
  id: string
): Promise<any> => {
  try {
    const response = await apiGui.delete(`/${destination}/${id}`);
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, destination);
  }
};

// Login function
export const login = async (user_id: string, password: string) => {
  try {
    const response = await apiBackend.post(
      "/login",
      { user_id, password },
      { withCredentials: true }
    );
    if (!response.data.token) {
      return {
        success: false,
        message: response.data.error || "No token in response",
        token: "",
      };
    }
    return {
      success: true,
      token: response.data.token,
      message: response,
    };
  } catch (error) {
    return handleAxiosError(error, "login");
  }
};

export const verify = async () => {
  try {
    const response = await apiBackend.get("/verifyToken", {
      withCredentials: true,
    });

    return {
      success: true,
      role: response.data.tokenValues["role"],
      message: response.data.message || "hi",
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const logout = async (): Promise<any> => {
  try {
    const response = await apiBackend.delete("/logout");
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, "logout");
  }
};

export const storePassword = async (
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiBackend.post("/register", {
      user_id,
      password,
    });
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, "logout");
  }
};

const handleAxiosError = (error: unknown, action: string) => {
  if (axios.isAxiosError(error)) {
    return { success: false, message: error.response?.data || error.message };
  }
  return {
    success: false,
    message: `An unexpected error occurred during ${action}`,
    token: "",
  };
};
