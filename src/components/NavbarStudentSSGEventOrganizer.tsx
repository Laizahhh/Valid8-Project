import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarStudentSSGEventOrganizer.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarStudentSSGEventOrganizer = () => {
  return (
    <div className="studentssg-eventorganizer-header">
      <div className="studentssg-eventorganizer-navbar">
        {/* Left Section: Logo & Page Title */}
        <div className="studentssg-eventorganizer-navbar-left">
          <img src={logoValid8} alt="Valid 8 logo" className="logo" />
          <h1 className="studentssg-eventorganizer-page-name">
            Student <br /> Officer <br /> Organizer
          </h1>
        </div>
        {/* Center Section: Navigation Links */}
        <div className="studentssg-eventorganizer-navbar-center">
          <ul className="studentssg-eventorganizer-menu">
            <li>
              <Link
                to="/student_ssg_eventorganizer_home"
                className="studentssg-eventorganizer-navigation-link"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_upcoming_events"
                className="studentssg-eventorganizer-navigation-link"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_events_attended"
                className="studentssg-eventorganizer-navigation-link"
              >
                Events Attended
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_events"
                className="studentssg-eventorganizer-navigation-link"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_attendance"
                className="studentssg-eventorganizer-navigation-link"
              >
                Attendance
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_records"
                className="studentssg-eventorganizer-navigation-link"
              >
                Records
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_create_event"
                className="studentssg-eventorganizer-navigation-link"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_manage_event"
                className="studentssg-eventorganizer-navigation-link"
              >
                Manage Event
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Section: User Profile */}
        <div className="studentssg-eventorganizer-navbar-right">
          <div className="studentssg-eventorganizer-profile-container">
            <Link
              to="/student_ssg_eventorganizer_profile"
              className="studentssg-eventorganizer-profile-link"
            >
              <img
                src={userprofile}
                alt="user profile"
                className="studentssg-eventorganizer-userprofile"
              />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudentSSGEventOrganizer;
