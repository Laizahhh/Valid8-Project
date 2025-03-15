import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarStudentSSG.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarStudentSSG = () => {
  return (
    <div className="studentssg-header">
      <div className="studentssg-navbar">
        {/* Left Section: Logo & Page Title */}
        <div className="studentssg-navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="studentssg-page-name">
            Student <br /> Officer
          </h1>
        </div>
        {/* Center Section: Navigation Links */}
        <div className="studentssg-navbar-center">
          <ul className="studentssg-menu">
            <li>
              <Link
                to="/studentssg_home"
                className="studentssg-navigation-link"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/studentssg_upcoming_events"
                className="studentssg-navigation-link"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                to="/studentssg_events_attended"
                className="studentssg-navigation-link"
              >
                Events Attended
              </Link>
            </li>
            <li>
              <Link
                to="/studentssg_events"
                className="studentssg-navigation-link"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/studentssg_attendance"
                className="studentssg-navigation-link"
              >
                Attendance
              </Link>
            </li>
            <li>
              <Link
                to="/studentssg_records"
                className="studentssg-navigation-link"
              >
                Records
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Section: User Profile */}
        <div className="studentssg-navbar-right">
          <div className="studentssg-profile-container">
            <Link to="/studentssg_profile" className="studentssg-profile-link">
              <img
                src={userprofile}
                alt="user profile"
                className="studentssg-userprofile"
              />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudentSSG;
