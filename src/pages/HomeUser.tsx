import React from "react";
import { Link } from "react-router-dom";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import NavbarAdmin from "../components/NavbarAdmin";

// Import colorful icons
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaCogs,
  FaChartBar,
  FaFileAlt,
  FaUserShield,
} from "react-icons/fa";

interface HomeUserProps {
  role: string;
}

export const HomeUser: React.FC<HomeUserProps> = ({ role }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("Role:", role); // Debugging to check role

  // Define card data with colorful icons
  const cardData = {
    student: [
      {
        title: "Upcoming Events",
        description: "Stay informed about upcoming school events.",
        icon: <FaCalendarAlt style={{ color: "#007bff" }} />, // Blue color
        link: "/student_upcoming_events",
      },
      {
        title: "Events Attended",
        description: "Check and review the events you've attended.",
        icon: <FaCheckCircle style={{ color: "#28a745" }} />, // Green color
        link: "/student_events_attended",
      },
    ],
    ssg: [
      {
        title: "Events",
        description: "View and manage currently ongoing events.",
        icon: <FaClipboardList style={{ color: "#ffc107" }} />, // Yellow color
        link: "/ssg_events",
      },
      {
        title: "Attendance",
        description: "Track and verify attendance records.",
        icon: <FaUsers style={{ color: "#17a2b8" }} />, // Teal color
        link: "/ssg_attendance",
      },
      {
        title: "Records",
        description: "Access records and event history.",
        icon: <FaChartBar style={{ color: "#6c757d" }} />, // Gray color
        link: "/ssg_records",
      },
    ],
    "event-organizer": [
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
    ],
    admin: [
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
    ],
    "student-ssg": [
      {
        title: "Upcoming Events",
        description: "Stay informed about upcoming school events.",
        icon: <FaCalendarAlt style={{ color: "#007bff" }} />,
        link: "/studentssg_upcoming_events",
      },
      {
        title: "Events Attended",
        description: "Check and review the events you've attended.",
        icon: <FaCheckCircle style={{ color: "#28a745" }} />, // Green color
        link: "/studentssg_events_attended",
      },
      {
        title: "Events",
        description: "View and manage currently ongoing events.",
        icon: <FaClipboardList style={{ color: "#ffc107" }} />,
        link: "/studentssg_events",
      },
      {
        title: "Attendance",
        description: "Track and verify attendance records.",
        icon: <FaUsers style={{ color: "#17a2b8" }} />, // Teal color
        link: "/studentssg_attendance",
      },
      {
        title: "Records",
        description: "Access records and event history.",
        icon: <FaChartBar style={{ color: "#6c757d" }} />, // Gray color
        link: "/studentssg_records",
      },
    ],
    "student-ssg-eventorganizer": [
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
    ],
  };

  // Choose appropriate card set based on role
  const cards = cardData[role] || cardData.student;

  return (
    <div className="home-header">
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "event-organizer" ? (
        <NavbarEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : role === "student" ? (
        <NavbarStudent />
      ) : role === "admin" ? (
        <NavbarAdmin />
      ) : null}

      <div className="d-flex flex-column min-vh-100">
        {/* Welcoming Description */}
        <div className="welcome-section text-center p-4">
          <h2>
            Welcome to Valid8 {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
            Dashboard
          </h2>
          <p className="text-muted">
            Your central hub for managing events, tracking attendance, and
            staying organized.
          </p>
        </div>

        {/* Dashboard Info Section */}
        <div className="dashboard-info container-fluid d-flex flex-wrap justify-content-center gap-4 mt-3">
          {cards.map((card, index) => (
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

export default HomeUser;
