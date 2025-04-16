// src/api/authApi.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// LOGIN FUNCTION
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    return response.data; // expected: { token, roles, email }
  } catch (error) {
    throw error;
  }
};
