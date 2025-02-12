import { UserParams, CustomerParams } from "./types";

// Define the base URLs
const BASE_URL_BACKEND = "http://localhost:8080/sms-gateway";
const BASE_URL_GUI = "http://localhost:8080/GUIApi";

// Helper function to construct headers
const getHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Helper function to handle errors
const handleError = (error: unknown, action: string) => {
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message || `An unexpected error occurred during ${action}`,
      token: "",
    };
  }
  return {
    success: false,
    message: `An unexpected error occurred during ${action}`,
    token: "",
  };
};

export const readCall = async (
  destination: string,
  id: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_GUI}/${destination}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await handleResponse(response);
    return { success: true, data };
  } catch (error) {
    return handleError(error, destination);
  }
};

type RegisterParams = UserParams | CustomerParams;

export const registerCall = async (
  destination: string,
  params: RegisterParams
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_GUI}/${destination}/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(params),
    });
    const data = await handleResponse(response);
    return { success: true, data };
  } catch (error) {
    return handleError(error, "registration");
  }
};

export const updateCall = async (
  destination: string,
  params: RegisterParams
): Promise<any> => {
  try {
    let url: string;
    if (destination === "user" && "user_id" in params) {
      url = `${BASE_URL_GUI}/${destination}/${params.user_id}`;
    } else if (destination === "customer" && "customer_id" in params) {
      url = `${BASE_URL_GUI}/${destination}/${params.customer_id}`;
    } else {
      throw new Error(`Missing required ID for ${destination}`);
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(params),
    });
    const data = await handleResponse(response);
    return { success: true, data };
  } catch (error) {
    return handleError(error, "registration");
  }
};

export const deleteCall = async (
  destination: string,
  id: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_GUI}/${destination}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await handleResponse(response);
    return { success: true, data };
  } catch (error) {
    return handleError(error, destination);
  }
};

export const login = async (user_id: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify({ user_id, password }),
      credentials: "include",
    });
    const data = await handleResponse(response);
    console.log(response);
    if (!data.token) {
      return {
        success: false,
        message: data.error || "No token in response",
        token: "",
      };
    }
    return {
      success: true,
      token: data.token,
      message: data,
    };
  } catch (error) {
    return handleError(error, "login");
  }
};

export const verify = async () => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/verifyToken`, {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    });
    const data = await handleResponse(response);

    return {
      success: true,
      role: data.tokenValues?.["role"],
      message: data.message || "hi",
      token: data.token,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const logout = async (): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/logout`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await handleResponse(response);
    return { success: true, data };
  } catch (error) {
    return handleError(error, "logout");
  }
};

export const storePassword = async (
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ user_id, password }),
    });
    const data = await handleResponse(response);
    return { success: true, data };
  } catch (error) {
    return handleError(error, "logout");
  }
};
