const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const login = async (email: string, password: string) => {
  try {
    // For mock API, we'll query all users and simulate authentication
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    
    if (!response.ok) throw new Error('Network error');

    const users = await response.json();
    const user = users[0];

    // Mock authentication logic
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Return data in your expected format
    return {
      token: user.token,
      roles: user.roles,
      email: user.email,
      id: user.id
    };

  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Login failed. Try again later.'
    );
  }
};