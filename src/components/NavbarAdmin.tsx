import { NavLink } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarAdmin.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarAdmin = () => {
  return (
    <div className="admin-header">
      <div className="admin-navbar">
        {/* Left Section: Logo and Page Title */}
        <div className="admin-navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="admin-page-name">Admin</h1>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="admin-navbar-center">
          <ul className="admin-menu">
            <li>
              <NavLink
                to="/admin_events"
                className={({ isActive }) =>
                  `admin-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin_reports"
                className={({ isActive }) =>
                  `admin-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin_manage_users"
                className={({ isActive }) =>
                  `admin-navigation-link ${isActive ? "active" : ""}`
                }
              >
                Manage Users
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="admin-navbar-right">
          <div className="admin-profile-container">
            <NavLink
              to="/admin_profile"
              className={({ isActive }) =>
                `admin-profile-link ${isActive ? "active" : ""}`
              }
            >
              <img
                src={userprofile}
                alt="user profile"
                className="admin-userprofile"
              />
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
