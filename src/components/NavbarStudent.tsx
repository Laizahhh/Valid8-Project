import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarStudentStyles.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarStudent = () => {
  return (
    <div className="student-header">
      <div className="student-navbar">
        {/* Left Section: Logo and Page Name */}
        <div className="navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="page-name">Student</h1>
        </div>
        {/* Center Section: Navigation Links */}
        <div className="navbar-center">
          <ul className="nav-menu">
            <li>
              <Link to="/student_home" className="student-navigation-link">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/student_upcoming_events"
                className="student-navigation-link"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                to="/student_events_attended"
                className="student-navigation-link"
              >
                Events Attended
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Section: User Profile */}
        <div className="navbar-right">
          <div className="student-profile-container">
            <Link to="/student_profile" className="student-profile-link">
              <img
                src={userprofile}
                alt="user profile"
                className="student-userprofile"
              />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudent;
