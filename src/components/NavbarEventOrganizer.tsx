import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarEventOrganizer.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarEventOrganizer = () => {
  return (
    <div className="event-organizer-header">
      <div className="event-organizer-navbar">
        {/* Left Section: Logo & Page Title */}
        <div className="event-organizer-navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="event-organizer-page-name">Event Organizer</h1>
        </div>
        {/* Center Section: Navigation Links */}
        <div className="event-organizer-navbar-center">
          <ul className="event-organizer-menu">
            <li>
              <Link
                to="/event_organizer_home"
                className="event-organizer-navigation-link"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/event_organizer_create_event"
                className="event-organizer-navigation-link"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                to="/event_organizer_manage_event"
                className="event-organizer-navigation-link"
              >
                Manage Event
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Section: User Profile */}
        <div className="event-organizer-navbar-right">
          <div className="event-organizer-profile-container">
            <Link
              to="/event_organizer_profile"
              className="event-organizer-profile-link"
            >
              <img
                src={userprofile}
                alt="user profile"
                className="event-organizer-userprofile"
              />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarEventOrganizer;
