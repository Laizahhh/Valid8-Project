import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardCheck,
  FaRegListAlt,
  FaCheckCircle,
  FaClipboard,
} from "react-icons/fa";
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
            <li title="Home">
              <NavLink
                to="/studentssg_home"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-navigation-link active"
                    : "studentssg-navigation-link"
                }
              >
                <FaHome />
              </NavLink>
            </li>
            <li title="Upcoming Events">
              <NavLink
                to="/studentssg_upcoming_events"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-navigation-link active"
                    : "studentssg-navigation-link"
                }
              >
                <FaCalendarAlt />
              </NavLink>
            </li>
            <li title="Events Attended">
              <NavLink
                to="/studentssg_events_attended"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-navigation-link active"
                    : "studentssg-navigation-link"
                }
              >
                <FaClipboardCheck />
              </NavLink>
            </li>
            <li title="Events">
              <NavLink
                to="/studentssg_events"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-navigation-link active"
                    : "studentssg-navigation-link"
                }
              >
                <FaRegListAlt />
              </NavLink>
            </li>
            <li title="Attendance">
              <NavLink
                to="/studentssg_attendance"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-navigation-link active"
                    : "studentssg-navigation-link"
                }
              >
                <FaCheckCircle />
              </NavLink>
            </li>
            <li title="Records">
              <NavLink
                to="/studentssg_records"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-navigation-link active"
                    : "studentssg-navigation-link"
                }
              >
                <FaClipboard />
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="studentssg-navbar-right">
          <div className="studentssg-profile-container">
            <NavLink
              to="/studentssg_profile"
              className={({ isActive }) =>
                isActive
                  ? "studentssg-navigation-link active"
                  : "studentssg-navigation-link"
              }
              title="Profile"
            >
              <img
                src={userprofile}
                alt="user profile"
                className="studentssg-userprofile"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudentSSG;
