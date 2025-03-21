import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaClipboardCheck } from "react-icons/fa";
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
            <li title="Home">
              <NavLink
                to="/student_home"
                className={({ isActive }) =>
                  isActive
                    ? "student-navigation-link active"
                    : "student-navigation-link"
                }
              >
                <FaHome />
              </NavLink>
            </li>
            <li title="Upcoming Events">
              <NavLink
                to="/student_upcoming_events"
                className={({ isActive }) =>
                  isActive
                    ? "student-navigation-link active"
                    : "student-navigation-link"
                }
              >
                <FaCalendarAlt />
              </NavLink>
            </li>
            <li title="Events Attended">
              <NavLink
                to="/student_events_attended"
                className={({ isActive }) =>
                  isActive
                    ? "student-navigation-link active"
                    : "student-navigation-link"
                }
              >
                <FaClipboardCheck />
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
                isActive
                  ? "student-navigation-link active"
                  : "student-navigation-link"
              }
              title="Profile"
            >
              <img
                src={userprofile}
                alt="user profile"
                className="student-userprofile"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudent;
