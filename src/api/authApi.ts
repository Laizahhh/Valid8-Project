const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const login = async (email: string, password: string) => {
  try {
    // Trim inputs
    email = email.trim();
    password = password.trim();

    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    if (!response.ok) throw new Error('Network error');

    const users = await response.json();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) throw new Error('Invalid credentials');

    return {
      token: user.token,
      roles: user.roles,
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      ...(user.profileImage && { profileImage: user.profileImage }),
      ...(user.studentId && { 
        studentId: user.studentId,
        yearLevel: user.yearLevel,
        program: user.program  
      })
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Authentication failed'
    );
  }
};