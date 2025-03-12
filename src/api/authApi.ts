import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  try {
    console.log("Attempting real login...");

    const response = await axiosInstance.post(`/login`, {
      email,
      password,
    });

    console.log("Login successful:", response.data);

    // Store token and user data
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data?.message || "Unknown error");
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post(`/logout`);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    console.log("Logout successful");
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data?.message || "Unknown error");
  }
};
