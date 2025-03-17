import { NavLink } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarSSG.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarSSG = () => {
  return (
    <div className="ssg-header">
      <div className="ssg-navbar">
        {/* Left Section: Logo & Page Title */}
        <div className="ssg-navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="ssg-page-name">
            SSG <br /> Officer
          </h1>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="ssg-navbar-center">
          <ul className="ssg-menu">
            <li>
              <NavLink
                to="/ssg_home"
                className={({ isActive }) =>
                  `ssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ssg_events"
                className={({ isActive }) =>
                  `ssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ssg_attendance"
                className={({ isActive }) =>
                  `ssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Attendance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ssg_records"
                className={({ isActive }) =>
                  `ssg-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Records
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="ssg-navbar-right">
          <div className="ssg-profile-container">
            <NavLink
              to="/ssg_profile"
              className={({ isActive }) =>
                `ssg-profile-link ${isActive ? "active" : ""}`
              }
            >
              <img
                src={userprofile}
                alt="user profile"
                className="ssg-userprofile"
              />
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSSG;
