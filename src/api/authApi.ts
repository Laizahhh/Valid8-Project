const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    
    return {
      token: data.access_token,
      roles: data.roles || [],
      email: data.email || email,
      id: data.user_id || data.id
    };

  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Login failed. Try again later.'
    );
  }
};