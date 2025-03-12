import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import userprofile from "../assets/images/userprofile.png";
import "../css/NavbarStudentSSGEventOrganizer.css";

export const NavbarStudentSSGEventOrganizer = () => {
  return (
    <div className="student-ssg-eventorganizer-header">
      <div className="student-ssg-eventorganizer-navbar">
        <img src={logoValid8} alt="Valid 8 logo" className="logo" />
        <h1 className="student-ssg-eventorganizer-page-name">
          Student <br /> Officer <br />
          Organizer
        </h1>
        <div className="student-ssg-eventorganizer-menu">
          <ul>
            <li>
              {" "}
              <Link
                to="/student_ssg_eventorganizer_home"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/student_ssg_eventorganizer_upcoming_events"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Upcoming Events
              </Link>
            </li>

            <li>
              <Link
                to="/student_ssg_eventorganizer_events_attended"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Events Attended
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                to="/student_ssg_eventorganizer_events"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Events
              </Link>
            </li>

            <li>
              <Link
                to="/student_ssg_eventorganizer_attendance"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Attendance
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_records"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Records
              </Link>{" "}
            </li>

            <li>
              <Link
                to="/student_ssg_eventorganizer_create_event"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Create Event
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/student_ssg_eventorganizer_manage_event"
                className="student-ssg-eventorganizer-navigation-link"
              >
                Manage Event
              </Link>{" "}
            </li>

            <li>
              <Link
                to="/student_ssg_eventorganizer_profile"
                className="student-ssg-eventorganizer-profile-link"
              >
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
