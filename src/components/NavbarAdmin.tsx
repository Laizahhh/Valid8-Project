import { NavLink } from "react-router-dom";
import { FaRegListAlt, FaClipboard, FaCheckCircle } from "react-icons/fa";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarAdmin.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarAdmin = () => {
  return (
    <div className="admin-header">
      <div className="admin-navbar">
        {/* Left Section: Logo and Page Name */}
        <div className="admin-navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="admin-page-name">Admin</h1>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="admin-navbar-center">
          <ul className="admin-menu">
            <li title="Events">
              <NavLink
                to="/admin_events"
                className={({ isActive }) =>
                  `admin-navigation-link ${isActive ? "active" : ""}`
                }
              >
                <FaRegListAlt />
              </NavLink>
            </li>
            <li title="Reports">
              <NavLink
                to="/admin_reports"
                className={({ isActive }) =>
                  `admin-navigation-link ${isActive ? "active" : ""}`
                }
              >
                <FaClipboard />
              </NavLink>
            </li>
            <li title="Manage Users">
              <NavLink
                to="/admin_manage_users"
                className={({ isActive }) =>
                  `admin-navigation-link ${isActive ? "active" : ""}`
                }
              >
                <FaCheckCircle />
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
              title="Profile"
            >
              <img
                src={userprofile}
                alt="user profile"
                className="admin-userprofile"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
