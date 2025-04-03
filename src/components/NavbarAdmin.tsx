import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaRegListAlt,
  FaClipboard,
  FaCheckCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import userprofile from "../assets/images/userprofile.png";
import "../css/NavbarAdmin.css";

export const NavbarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const expandSidebar = () => {
    setIsExpanded(true);
  };

  const collapseSidebar = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {/* Hamburger Icon - Only shows when sidebar is closed */}
      {!sidebarOpen && (
        <div className="admin-hamburger" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`admin-sidebar ${sidebarOpen ? "open" : ""} ${
          isExpanded ? "expanded" : "collapsed"
        }`}
        onMouseEnter={expandSidebar}
        onMouseLeave={collapseSidebar}
      >
        {/* Header with Logo, Title, and Close Button */}
        <div className="admin-sidebar-header">
          <div className="header-content-wrapper">
            <img src={logoValid8} alt="Valid 8 logo" className="sidebar-logo" />
            <h1 className="admin-title">Admin</h1>
          </div>
          {sidebarOpen && (
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="admin-nav">
          <ul className="admin-nav-menu">
            <li>
              <NavLink
                to="/admin_home"
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
                onClick={() => setSidebarOpen(false)}
                title="Home"
              >
                <FaHome className="nav-icon" />
                <span className="nav-text">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin_events"
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
                onClick={() => setSidebarOpen(false)}
                title="Events"
              >
                <FaRegListAlt className="nav-icon" />
                <span className="nav-text">Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin_reports"
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
                onClick={() => setSidebarOpen(false)}
                title="Reports"
              >
                <FaClipboard className="nav-icon" />
                <span className="nav-text">Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin_manage_users"
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
                onClick={() => setSidebarOpen(false)}
                title="Manage Users"
              >
                <FaCheckCircle className="nav-icon" />
                <span className="nav-text">Manage Users</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="admin-sidebar-footer">
          <NavLink
            to="/admin_profile"
            className={({ isActive }) =>
              isActive ? "admin-profile-link active" : "admin-profile-link"
            }
            onClick={() => setSidebarOpen(false)}
            title="Profile"
          >
            <img
              src={userprofile}
              alt="user profile"
              className="admin-profile-img"
            />
            <span className="profile-text">Profile</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`admin-content ${sidebarOpen ? "shifted" : ""} ${
          isExpanded ? "content-expanded" : "content-collapsed"
        }`}
      ></div>
    </>
  );
};

export default NavbarAdmin;
