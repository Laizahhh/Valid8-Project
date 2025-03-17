import { NavLink } from "react-router-dom";
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
              <NavLink
                to="/studentssg_home"
                className={({ isActive }) =>
                  `studentssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentssg_upcoming_events"
                className={({ isActive }) =>
                  `studentssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Upcoming Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentssg_events_attended"
                className={({ isActive }) =>
                  `studentssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Events Attended
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentssg_events"
                className={({ isActive }) =>
                  `studentssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentssg_attendance"
                className={({ isActive }) =>
                  `studentssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Attendance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studentssg_records"
                className={({ isActive }) =>
                  `studentssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Records
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
                `studentssg-profile-link ${isActive ? "active" : ""}`
              }
            >
              <img
                src={userprofile}
                alt="user profile"
                className="studentssg-userprofile"
              />
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudentSSG;
