import { NavLink } from "react-router-dom"; // ✅ Changed from Link to NavLink
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
              <NavLink
                to="/student_ssg_eventorganizer_home"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_upcoming_events"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Upcoming Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_events_attended"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Events Attended
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_events"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_attendance"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Attendance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_records"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Records
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_create_event"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Create Event
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student_ssg_eventorganizer_manage_event"
                className={({ isActive }) =>
                  isActive
                    ? "studentssg-eventorganizer-navigation-link active"
                    : "studentssg-eventorganizer-navigation-link"
                }
              >
                Manage Event
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="studentssg-eventorganizer-navbar-right">
          <div className="studentssg-eventorganizer-profile-container">
            <NavLink
              to="/student_ssg_eventorganizer_profile"
              className={({ isActive }) =>
                isActive
                  ? "studentssg-eventorganizer-profile-link active"
                  : "studentssg-eventorganizer-profile-link"
              }
            >
              <img
                src={userprofile}
                alt="user profile"
                className="studentssg-eventorganizer-userprofile"
              />
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudentSSGEventOrganizer;
