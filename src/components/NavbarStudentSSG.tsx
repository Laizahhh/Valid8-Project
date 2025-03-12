import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import userprofile from "../assets/images/userprofile.png";
import "../css/NavbarStudentSSG.css";

export const NavbarStudentSSG = () => {
  return (
    <div className="studentssg-header">
      <div className="studentssg-navbar">
        <img src={logoValid8} alt="Valid 8 logo" className="logo" />
        <h1 className="page-name">
          Student <br /> Officer
        </h1>
        <div className="student-menu">
          <ul>
            <li>
              {" "}
              <Link to="/studentssg_home" className="navigation-link">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/studentssg_upcoming_events"
                className="navigation-link"
              >
                Upcoming Events
              </Link>
            </li>

            <li>
              <Link
                to="/studentssg_events_attended"
                className="navigation-link"
              >
                Events Attended
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/studentssg_events" className="navigation-link">
                Events
              </Link>
            </li>

            <li>
              <Link to="/studentssg_attendance" className="navigation-link">
                Attendance
              </Link>{" "}
            </li>
            <li>
              <Link to="/studentssg_records" className="navigation-link">
                Records
              </Link>{" "}
            </li>

            <li>
              <Link to="/studentssg_profile" className="profile-link">
                <img
                  src={userprofile}
                  alt="user profile"
                  className="userprofile"
                />
                Profile
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
