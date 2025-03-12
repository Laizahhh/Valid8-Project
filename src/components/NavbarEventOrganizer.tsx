import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarEventOrganizer.css";
import userprofile from "../assets/images/userprofile.png";
export const NavbarEventOrganizer = () => {
  return (
    <div className="event-organizer-header">
      <div className="event-organizer-navbar">
        <img src={logoValid8} alt="Valid 8 logo" className="logo" />
        <h1 className="page-name">Event Organizer</h1>
        <div className="event-organizer-menu">
          <ul>
            <li>
              {" "}
              <Link
                to="/event_organizer_home"
                className="event-organizer-navigation-link"
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
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
              </Link>{" "}
            </li>

            <li>
              <Link to="/event_organizer_profile" className="profile-link">
                <img
                  src={userprofile}
                  alt="user profile"
                  className="event-organizer-userprofile"
                />
                Profile
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
