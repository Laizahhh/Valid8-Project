import { NavLink } from "react-router-dom";
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
              <NavLink
                to="/student_home"
                className={({ isActive }) =>
                  `student-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_upcoming_events"
                className={({ isActive }) =>
                  `student-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Upcoming Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_events_attended"
                className={({ isActive }) =>
                  `student-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Events Attended
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="navbar-right">
          <div className="student-profile-container">
            <NavLink
              to="/student_profile"
              className={({ isActive }) =>
                `student-profile-link ${isActive ? "active" : ""}`
              }
            >
              <img
                src={userprofile}
                alt="user profile"
                className="student-userprofile"
              />
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudent;
