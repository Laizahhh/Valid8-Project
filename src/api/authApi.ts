export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ADD THIS LINE
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }

    return {
      token: data.token,
      email: data.email,
      roles: data.roles,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};


