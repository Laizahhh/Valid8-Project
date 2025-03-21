import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaRegListAlt,
  FaCheckCircle,
  FaClipboard,
} from "react-icons/fa";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import userprofile from "../assets/images/userprofile.png";
import "../css/NavbarSSG.css";

export const NavbarSSG: React.FC = () => {
  const navLinks = [
    { path: "/ssg_home", icon: <FaHome />, tooltip: "Home" },
    { path: "/ssg_events", icon: <FaRegListAlt />, tooltip: "Events" },
    { path: "/ssg_attendance", icon: <FaCheckCircle />, tooltip: "Attendance" },
    { path: "/ssg_records", icon: <FaClipboard />, tooltip: "Records" },
  ];

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
            {navLinks.map((item, index) => (
              <li key={index} title={item.tooltip}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "ssg-navigation-link active"
                      : "ssg-navigation-link"
                  }
                >
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="ssg-navbar-right">
          <div className="ssg-profile-container">
            <NavLink
              to="/ssg_profile"
              className={({ isActive }) =>
                isActive ? "ssg-navigation-link active" : "ssg-navigation-link"
              }
              title="Profile"
            >
              <img
                src={userprofile}
                alt="User Profile"
                className="ssg-userprofile"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSSG;
