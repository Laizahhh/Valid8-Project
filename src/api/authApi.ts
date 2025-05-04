const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


export const login = async (email: string, password: string) => {
  try {
    // Trim inputs
    email = email.trim();
    password = password.trim();

    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Incorrect email or password');
      }
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();

    return {
      token: data.access_token,
      tokenType: data.token_type,
      email: data.email,
      roles: data.roles,
      id: data.user_id,
      firstName: data.first_name,
      lastName: data.last_name,
      // Include any other fields you're returning from backend
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Authentication failed'
    );
  }
};