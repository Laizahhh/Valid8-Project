import { Link } from "react-router-dom";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";

// Import colorful icons
import { FaPlus, FaCogs } from "react-icons/fa";

const EventOrganizerDashboard = () => {
  // Event organizer card data with colorful icons - exactly as in HomeUser
  const eventOrganizerCards = [
    {
      title: "Create Event",
      description: "Plan and schedule new events.",
      icon: <FaPlus style={{ color: "#007bff" }} />, // Blue color
      link: "/event_organizer_create_event",
    },
    {
      title: "Manage Events",
      description: "Modify, update, or remove existing events.",
      icon: <FaCogs style={{ color: "#6f42c1" }} />, // Purple color
      link: "/event_organizer_manage_event",
    },
  ];

  return (
    <div className="home-header">
      <NavbarEventOrganizer />

      <div className="d-flex flex-column min-vh-100">
        {/* Welcoming Description */}
        <div className="welcome-section text-center p-4">
          <h2>Welcome to the Valid8 Event Organizer Dashboard</h2>
          <p className="text-muted">
            Your central hub for managing events, tracking attendance, and
            staying organized.
          </p>
        </div>

        {/* Dashboard Info Section */}
        <div className="dashboard-info container-fluid d-flex flex-wrap justify-content-center gap-4 mt-3">
          {eventOrganizerCards.map((card, index) => (
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

export default EventOrganizerDashboard;
