import axios from "axios";
import API_URL from "./api"; // Ensure API_URL is correctly set

export const login = async (email: string, password: string) => {
  try {
    console.log("Attempting real login...");

    const response = await axios.post(`${API_URL}/login`, 
      { email, password }, 
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Login successful:", response.data);

    const { token, ...userData } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data?.message || "Unknown error");
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("Logout successful");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Logout failed:", error.response?.data?.message || "Unknown error");
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
};
