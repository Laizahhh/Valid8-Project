import { Link } from "react-router-dom";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";

// Import colorful icons
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardList,
  FaChartBar,
  FaPlus,
} from "react-icons/fa";

export const StudentSsgDashboard = () => {
  // Student-SSG card data with colorful icons - matching HomeUser exactly
  const studentSsgCards = [
    {
      title: "Upcoming Events",
      description: "Stay informed about upcoming school events.",
      icon: <FaCalendarAlt style={{ color: "#007bff" }} />,
      link: "/studentssg_upcoming_events",
    },
    {
      title: "Events Attended",
      description: "Check and review the events you've attended.",
      icon: <FaCheckCircle style={{ color: "#28a745" }} />,
      link: "/studentssg_events_attended",
    },
    {
      title: "Events",
      description: "View and manage currently ongoing events.",
      icon: <FaClipboardList style={{ color: "#ffc107" }} />,
      link: "/studentssg_events",
    },
    {
      title: "Records",
      description: "Access records and event history.",
      icon: <FaChartBar style={{ color: "#6c757d" }} />,
      link: "/studentssg_records",
    },
    {
      title: "Manual Attendance",
      description: "Record Attendance",
      icon: <FaPlus style={{ color: "#17a2b8" }} />, // Teal color
      link: "/studentssg_manual_attendance",
    },
  ];

  return (
    <div
      className="home-user-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavbarStudentSSG />

      <main
        className="flex-grow-1"
        style={{ padding: "2rem 1rem 2rem 3rem", backgroundColor: "#f5f7fa" }}
      >
        {/* Welcoming Description */}
        <div
          className="welcome-section text-center mb-5"
          style={{ marginRight: "2rem" }}
        >
          <h2 className="mb-3" style={{ color: "#343a40", fontWeight: "600" }}>
            Welcome Student ssg!
          </h2>
          <p
            className="text-muted"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Your central hub for managing events, tracking attendance, and
            staying organized.
          </p>
        </div>

        {/* Dashboard Cards Section */}
        <div className="container" style={{ paddingRight: "2rem" }}>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 justify-content-center">
            {studentSsgCards.map((card, index) => (
              <div className="col" key={index}>
                <Link to={card.link} className="text-decoration-none">
                  <div className="card h-100 shadow-sm border-0 hover-effect">
                    <div className="card-body text-center p-4 d-flex flex-column align-items-center">
                      <div
                        className="icon-wrapper mb-3"
                        style={{ fontSize: "2rem" }}
                      >
                        {card.icon}
                      </div>
                      <h5
                        className="card-title mb-2"
                        style={{ color: "#343a40" }}
                      >
                        {card.title}
                      </h5>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer
        className="mt-auto py-3"
        style={{
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #dee2e6",
          paddingRight: "0rem",
          paddingLeft: "1rem",
        }} // Added paddingRight
      >
        <div className="container text-center">
          <p className="mb-0 text-muted" style={{ fontSize: "0.875rem" }}>
            Developed by: A.B.C.C
          </p>
        </div>
      </footer>

      {/* Add the same custom styles as HomeUser */}
      <style>{`
        .hover-effect {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-radius: 0.5rem;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .icon-wrapper {
          transition: transform 0.3s ease;
        }
        .hover-effect:hover .icon-wrapper {
          transform: scale(1.1);
        }
        
        @media (min-width: 992px) {
          .home-user-container {
            margin-left: 5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentSsgDashboard;
