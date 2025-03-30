import { NavbarStudent } from "../components/NavbarStudent";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <NavbarStudent />

      {/* Welcoming Description */}
      <div className="welcome-section text-center p-4">
        <h2>Welcome to the Valid8 Student Dashboard</h2>
        <p className="text-muted">
          Your central hub to stay updated on upcoming events and track your
          attendance. Stay organized and never miss an event!
        </p>
      </div>

      {/* Student Dashboard Info Section */}
      <div className="container mt-3">
        <div className="row justify-content-center gap-3">
          <Link
            to="/student_upcoming_events"
            className="col-md-5 col-12 text-decoration-none"
          >
            <div
              className="info-card p-3 shadow rounded text-center"
              style={{ color: "black" }}
            >
              <h5 style={{ color: "black" }}>📅 Upcoming Events</h5>
              <p style={{ color: "black" }}>
                View all scheduled events and plan ahead.
              </p>
            </div>
          </Link>
          <Link
            to="/student_events_attended"
            className="col-md-5 col-12 text-decoration-none"
          >
            <div
              className="info-card p-3 shadow rounded text-center"
              style={{ color: "black" }}
            >
              <h5 style={{ color: "black" }}>✅ Events Attended</h5>
              <p style={{ color: "black" }}>
                Check your attendance record and past events.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
