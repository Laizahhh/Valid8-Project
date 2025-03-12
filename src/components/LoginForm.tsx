import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi"; // Import login function

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userData = await login(email, password);
      console.log("User Data:", userData);

      if (!userData.token || !userData.roles) {
        throw new Error("Invalid response from server.");
      }

      // Store user info and token
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);

      // Role-based redirection
      if (userData.roles.includes("admin")) {
        navigate("/admin_dashboard");
      } else if (
        ["student", "ssg", "event-organizer"].every((role) =>
          userData.roles.includes(role)
        )
      ) {
        navigate("/student_ssg_eventorganizer_dashboard");
      } else if (
        ["student", "ssg"].every((role) => userData.roles.includes(role))
      ) {
        navigate("/student_ssg_dashboard");
      } else if (userData.roles.includes("student")) {
        navigate("/student_dashboard");
      } else if (userData.roles.includes("ssg")) {
        navigate("/ssg_dashboard");
      } else if (userData.roles.includes("event-organizer")) {
        navigate("/event_organizer_dashboard");
      } else {
        alert("No valid role found!");
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Login failed! Check credentials."
      );
    }
  };

  return (
    <div className="container mt-4">
      <h4>User Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
            minLength={2}
            maxLength={50}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
            minLength={8}
            maxLength={30}
          />
        </div>
        <button type="submit" className="home-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
