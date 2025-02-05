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

// Response handling (optional: for specific transformations)
apiBackend.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; // Directly return data for simplicity
  },
  (error: AxiosError) => {
    // Custom error handling logic
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const readCall = async (
  destination: string,
  id: string
): Promise<any> => {
  try {
    const response = await apiGui.get("/" + destination + "/" + id);
    return { success: true, data: response }; // Return data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      return { success: false, message: error.response?.data || error.message };
    }
    return {
      success: false,
      message:
        "An unexpected error occurred while fetching the " +
        destination +
        " data ",
    };
  }
};

// Register function

// Union type to handle both
type RegisterParams = UserParams | CustomerParams;

export const registerCall = async (
  destination: string,
  params: RegisterParams
): Promise<any> => {
  try {
    let payload;

    // Check if it's a user or customer based on unique property
    if ("user_id" in params) {
      payload = {
        user_id: params.user_id,
        customer_id: params.customer_id,
        user_name: params.user_name,
        user_phonenumber: params.user_phonenumber,
        user_role: params.user_role,
        user_is_active: params.user_is_active,
      };
    } else {
      payload = {
        customer_name: params.customer_name,
        customer_orgnr: params.customer_orgnr,
        customer_nr: params.customer_nr,
        customer_contact_person: params.customer_contact_person,
        customer_phonenumber: params.customer_phonenumber,
        customer_final_date: params.customer_final_date,
        customer_is_active: params.customer_is_active,
      };
    }

    const response = await apiGui.post("/" + destination + "/", payload);
    return { success: true, data: response }; // Return data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Make sure error message is a string
      const message = error.response?.data?.error || error.message;
      return {
        success: false,
        message:
          typeof message === "string"
            ? message
            : "An unexpected error occurred",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred during registration",
    };
  }
};

export const updateCall = async (
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiGui.patch("/upsert", { user_id, password });
    return { success: true, data: response }; // Return data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      return { success: false, message: error.response?.data || error.message };
    }
    return {
      success: false,
      message: "An unexpected error occurred during update",
    };
  }
};

export const deleteCall = async (
  destination: string,
  id: string
): Promise<any> => {
  try {
    const response = await apiGui.delete("/" + destination + "/" + id);
    return { success: true, data: response }; // Return data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      return { success: false, message: error.response?.data || error.message };
    }
    return {
      success: false,
      message:
        "An unexpected error occurred while deleting the " +
        destination +
        " data",
    };
  }
};

// Login function
export const login = async (
  user_id: string,
  password: string
): Promise<any> => {
  try {
    const response = await apiBackend.post("/login", { user_id, password });
    return { success: true, data: response }; // Return data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      return { success: false, message: error.response?.data || error.message };
    }
    return {
      success: false,
      message: "An unexpected error occurred during login",
    };
  }
};

// Logout function
export const logout = async (): Promise<any> => {
  try {
    const response = await apiBackend.delete("/logout");
    return { success: true, data: response }; // Return data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Safe to access error.response or error.message
      return { success: false, message: error.response?.data || error.message };
    }
    return {
      success: false,
      message: "An unexpected error occurred during logout",
    };
  }
};
