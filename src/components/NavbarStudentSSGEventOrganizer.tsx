import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaClipboardCheck,
  FaRegListAlt,
  FaCheckCircle,
  FaPlusCircle,
  FaClipboard,
  FaBars,
  FaTimes,
  FaThList,
  FaPlus,
} from "react-icons/fa";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import userprofile from "../assets/images/userprofile.png";
import "../css/NavbarStudentSSGEventOrganizer.css";

export const NavbarStudentSSGEventOrganizer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const navLinks = [
    {
      path: "/student_ssg_eventorganizer_home",
      icon: <FaHome />,
      text: "Home",
    },
    {
      path: "/student_ssg_eventorganizer_upcoming_events",
      icon: <FaCalendarAlt />,
      text: "Upcoming Events",
    },
    {
      path: "/student_ssg_eventorganizer_events_attended",
      icon: <FaClipboardCheck />,
      text: "Events Attended",
    },
    {
      path: "/student_ssg_eventorganizer_events",
      icon: <FaRegListAlt />,
      text: "Events",
    },
    {
      path: "/student_ssg_eventorganizer_manual_attendance",
      icon: <FaCheckCircle />,
      text: "Manual Attendance",
    },
    {
      path: "/student_ssg_eventorganizer_records",
      icon: <FaClipboard />,
      text: "Records",
    },
    {
      path: "/student_ssg_eventorganizer_create_event",
      icon: <FaPlusCircle />,
      text: "Create Event",
    },
    {
      path: "/student_ssg_eventorganizer_manage_event",
      icon: <FaClipboardList />,
      text: "Manage Event",
    },
    {
      path: "/student_ssg_eventorganizer_manual_attendance",
      icon: <FaPlus />,
      text: "Manage Attendance",
    },
  ];

  return (
    <>
      {/* Hamburger Icon - Only shows when sidebar is closed */}
      {!sidebarOpen && (
        <div className="ssg-hamburger" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`ssg-sidebar ${sidebarOpen ? "open" : ""} ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        {/* Header with Logo, Title, and Close Button */}
        <div className="ssg-sidebar-header">
          <div className="header-content-wrapper">
            <img src={logoValid8} alt="Valid 8 logo" className="sidebar-logo" />
            <h1 className="ssg-title">
              Student
              <br />
              Officer
              <br />
              Organizer
            </h1>
          </div>
          {sidebarOpen && (
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="ssg-nav">
          <ul className="ssg-nav-menu">
            {/* Menu Toggle Button */}
            <li className="menu-toggle-item">
              <button
                className="ssg-nav-link menu-toggle-btn"
                onClick={toggleExpand}
                title={isExpanded ? "Collapse menu" : "Expand menu"}
              >
                <FaThList className="nav-icon" />
                <span className="nav-text">Menu</span>
              </button>
            </li>

            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "ssg-nav-link active" : "ssg-nav-link"
                  }
                  onClick={() => setSidebarOpen(false)}
                  title={item.text}
                >
                  <div className="nav-icon">{item.icon}</div>
                  <span className="nav-text">{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="ssg-sidebar-footer">
          <NavLink
            to="/student_ssg_eventorganizer_profile"
            className={({ isActive }) =>
              isActive ? "ssg-profile-link active" : "ssg-profile-link"
            }
            onClick={() => setSidebarOpen(false)}
            title="Profile"
          >
            <img
              src={userprofile}
              alt="user profile"
              className="ssg-profile-img"
            />
            <span className="profile-text">Profile</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`ssg-content ${sidebarOpen ? "shifted" : ""} ${
          isExpanded ? "content-expanded" : "content-collapsed"
        }`}
      ></div>
    </>
  );
};

export default NavbarStudentSSGEventOrganizer;
