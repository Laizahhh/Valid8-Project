import { Link } from "react-router-dom";
import { NavbarAdmin } from "../components/NavbarAdmin";

// Import colorful icons
import { FaClipboardList, FaFileAlt, FaUserShield } from "react-icons/fa";

const AdminDashboard = () => {
  // Admin card data with colorful icons - exactly as in HomeUser
  const adminCards = [
    {
      title: "Events",
      description: "Monitor and oversee all ongoing events.",
      icon: <FaClipboardList style={{ color: "#ffc107" }} />, // Yellow color
      link: "/admin_events",
    },
    {
      title: "Reports",
      description: "Generate and analyze event attendance and statistics.",
      icon: <FaFileAlt style={{ color: "#007bff" }} />, // Blue color
      link: "/admin_reports",
    },
    {
      title: "Manage Users",
      description: "Create, update, and manage user accounts and roles.",
      icon: <FaUserShield style={{ color: "#dc3545" }} />, // Red color
      link: "/admin_manage_users",
    },
  ];

  return (
    <div className="home-header">
      <NavbarAdmin />

      <div className="d-flex flex-column min-vh-100">
        {/* Welcoming Description */}
        <div className="welcome-section text-center p-4">
          <h2>Welcome to the Valid8 Admin Dashboard</h2>
          <p className="text-muted">
            Your central hub for managing events, tracking attendance, and
            staying organized.
          </p>
        </div>

        {/* Dashboard Info Section */}
        <div className="dashboard-info container-fluid d-flex flex-wrap justify-content-center gap-4 mt-3">
          {adminCards.map((card, index) => (
            <Link to={card.link} key={index} className="text-decoration-none">
              <div
                className="info-card p-3 shadow rounded text-center mb-3 d-flex flex-column align-items-center justify-content-center"
                style={{ width: "280px", height: "200px", color: "black" }}
              >
                <span style={{ fontSize: "1.5rem" }}>{card.icon}</span>
                <div>
                  <h5 style={{ color: "black", marginBottom: "5px" }}>
                    {card.title}
                  </h5>
                  <p style={{ color: "black" }}>{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer
          style={{
            marginTop: "auto",
            width: "100%",
            fontSize: "14px",
            color: "#555",
            borderTop: "1px solid #ddd",
            backgroundColor: "#f8f9fa",
            padding: "10px",
            textAlign: "center",
            position: "relative",
            bottom: 0,
          }}
        >
          <p style={{ margin: 0 }}>Developed by: A.B.C.C</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
