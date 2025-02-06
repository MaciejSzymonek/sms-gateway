import axios, { AxiosError, AxiosResponse } from "axios";

interface UserParams {
  user_id: string;
  customer_id: number;
  user_name: string;
  user_phonenumber: string;
  user_role: string;
  user_is_active: boolean;
}

interface CustomerParams {
  customer_name: string;
  customer_orgnr: number;
  customer_nr: string;
  customer_contact_person: string;
  customer_phonenumber: string;
  customer_final_date: string;
  customer_is_active: boolean;
}

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
  const token = localStorage.getItem("Accesstoken");
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
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiGui.patch("/upsert", { user_id, password });
    return { success: true, data: response };
  } catch (error) {
    return handleAxiosError(error, "update");
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
      };
    }
    return {
      success: true,
      token: response.data.token,
    };
  } catch (error) {
    return handleAxiosError(error, "login");
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

const handleAxiosError = (error: unknown, action: string) => {
  if (axios.isAxiosError(error)) {
    return { success: false, message: error.response?.data || error.message };
  }
  return {
    success: false,
    message: `An unexpected error occurred during ${action}`,
  };
};
