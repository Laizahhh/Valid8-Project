import { Link } from "react-router-dom";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";

// Import colorful icons
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaCogs,
  FaChartBar,
} from "react-icons/fa";

const StudentSsgEventDashboard = () => {
  // Student-SSG-EventOrganizer card data with colorful icons - exactly as in HomeUser
  const studentSsgEventOrganizerCards = [
    {
      title: "Upcoming Events",
      description: "Stay informed about upcoming school events.",
      icon: <FaCalendarAlt style={{ color: "#007bff" }} />,
      link: "/student_ssg_eventorganizer_upcoming_events",
    },
    {
      title: "Events Attended",
      description: "Check and review the events you've attended.",
      icon: <FaCheckCircle style={{ color: "#28a745" }} />, // Green color
      link: "/student_ssg_eventorganizer_events_attended",
    },
    {
      title: "Events",
      description: "View and manage currently ongoing events.",
      icon: <FaClipboardList style={{ color: "#ffc107" }} />,
      link: "/student_ssg_eventorganizer_events",
    },
    {
      title: "Attendance",
      description: "Track and verify attendance records.",
      icon: <FaUsers style={{ color: "#17a2b8" }} />, // Teal color
      link: "/student_ssg_eventorganizer_attendance",
    },
    {
      title: "Records",
      description: "Access records and event history.",
      icon: <FaChartBar style={{ color: "#6c757d" }} />, // Gray color
      link: "/student_ssg_eventorganizer_records",
    },
    {
      title: "Create Event",
      description: "Plan and schedule new events.",
      icon: <FaPlus style={{ color: "#007bff" }} />, // Blue color
      link: "/student_ssg_eventorganizer_create_event",
    },
    {
      title: "Manage Events",
      description: "Modify, update, or remove existing events.",
      icon: <FaCogs style={{ color: "#6f42c1" }} />, // Purple color
      link: "/student_ssg_eventorganizer_manage_event",
    },
  ];

  return (
    <div className="home-header">
      <NavbarStudentSSGEventOrganizer />

      <div className="d-flex flex-column min-vh-100">
        {/* Welcoming Description */}
        <div className="welcome-section text-center p-4">
          <h2>Welcome to the Valid8 Student-SSG-Event Organizer Dashboard</h2>
          <p className="text-muted">
            Your central hub for managing events, tracking attendance, and
            staying organized.
          </p>
        </div>

        {/* Dashboard Info Section */}
        <div className="dashboard-info container-fluid d-flex flex-wrap justify-content-center gap-4 mt-3">
          {studentSsgEventOrganizerCards.map((card, index) => (
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

export default StudentSsgEventDashboard;
