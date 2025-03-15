import { Link } from "react-router-dom";
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
              <Link to="/ssg_home" className="ssg-navigation-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/ssg_events" className="ssg-navigation-link">
                Events
              </Link>
            </li>
            <li>
              <Link to="/ssg_attendance" className="ssg-navigation-link">
                Attendance
              </Link>
            </li>
            <li>
              <Link to="/ssg_records" className="ssg-navigation-link">
                Records
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Section: User Profile */}
        <div className="ssg-navbar-right">
          <div className="ssg-profile-container">
            <Link to="/ssg_profile" className="ssg-profile-link">
              <img
                src={userprofile}
                alt="user profile"
                className="ssg-userprofile"
              />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSSG;
