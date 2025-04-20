const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    
    if (!response.ok) throw new Error('Network error');

    const users = await response.json();
    const user = users[0];

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    return {
      token: user.token,
      roles: user.roles, // <-- Now matches plural "roles" from db.json
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      // Include student-specific fields if available
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