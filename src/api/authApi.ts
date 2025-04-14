// src/api/authApi.ts
export const login = async (email: string, password: string) => {
  // Dummy user data
  const users = [
    { email: "admin@gmail.com", password: "admin123", roles: ["admin"] },
    { email: "student@gmail.com", password: "student123", roles: ["student"] },
    { email: "ssg@gmail.com", password: "ssg12345", roles: ["ssg"] },
    { email: "event@gmail.com", password: "event123", roles: ["event-organizer"] },
    { email: "studentssg@gmail.com", password: "studentssg123", roles: ["student", "ssg"] },
    { email: "studentssgevent@gmail.com", password: "studentssgevent123", roles: ["student", "ssg", "event-organizer"] },
  ];

  // Check if user exists
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  // Return fake token & user data
  return {
    token: "fake-jwt-token",
    email: user.email,
    roles: user.roles,
  };
};
