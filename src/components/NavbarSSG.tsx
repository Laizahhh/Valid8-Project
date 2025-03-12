import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarSSG.css";
import userprofile from "../assets/images/userprofile.png";
export const NavbarSSG = () => {
  return (
    <div className="ssg-header">
      <div className="ssg-navbar">
        <img src={logoValid8} alt="Valid 8 logo" className="logo" />
        <h1 className="page-name">
          SSG <br />
          Officer
        </h1>
        <div className="ssg-menu">
          <ul>
            <li>
              {" "}
              <Link to="/ssg_home" className="navigation-link">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/ssg_events" className="navigation-link">
                Events
              </Link>
            </li>

            <li>
              <Link to="/ssg_attendance" className="navigation-link">
                Attendance
              </Link>{" "}
            </li>
            <li>
              <Link to="/ssg_records" className="navigation-link">
                Records
              </Link>{" "}
            </li>

            <li>
              <Link to="/ssg_profile" className="profile-link">
                <img
                  src={userprofile}
                  alt="user profile"
                  className="userprofile"
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
