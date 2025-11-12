import axios from "axios";
import type { AxiosRequestConfig } from "axios";

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export const baseURL = 'http://localhost:4000'

const commonAPI = async <T = any>(
  httpMethod: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  url: string,
  reqBody?: any
): Promise<APIResponse<T>> => {
  const token = localStorage.getItem("authToken");

  const isFormData = reqBody instanceof FormData;
  
  const reqConfig: AxiosRequestConfig = {
    method: httpMethod,
    url,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
    ...(httpMethod === "GET" ? { params: reqBody } : { data: reqBody }),
  };

  try {
    const response = await axios<T>(reqConfig);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    if (!error.response) {
      console.error("❌ Server unreachable:", error.message);
      window.location.href = "/server-down";
      return { success: false, error: "Server unreachable" };
    }

    if (error.response.status === 403) {
      console.warn("🔐 Token expired or invalid. Logging out...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      window.location.href = "/login";
      return { success: false, error: "Token expired", status: 403 };
    }

    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
    };
  }
};

export default commonAPI;
