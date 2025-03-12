import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarStudentStyles.css";
import userprofile from "../assets/images/userprofile.png";
export const NavbarStudent = () => {
  return (
    <div className="student-header">
      <div className="student-navbar">
        <img src={logoValid8} alt="Valid 8 logo" className="logo" />
        <h1 className="page-name">Student</h1>
        <div className="student-menu">
          <ul>
            <li>
              {" "}
              <Link to="/student_home" className="navigation-link">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/student_upcoming_events" className="navigation-link">
                Upcoming Events
              </Link>
            </li>

            <li>
              <Link to="/student_events_attended" className="navigation-link">
                Events Attended
              </Link>{" "}
            </li>

            <li>
              <Link to="/student_profile" className="profile-link">
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
