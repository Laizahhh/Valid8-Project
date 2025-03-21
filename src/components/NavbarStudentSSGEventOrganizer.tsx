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
} from "react-icons/fa";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarStudentSSGEventOrganizer.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarStudentSSGEventOrganizer: React.FC = () => {
  const navLinks = [
    {
      path: "/student_ssg_eventorganizer_home",
      icon: <FaHome />,
      tooltip: "Home",
    },
    {
      path: "/student_ssg_eventorganizer_upcoming_events",
      icon: <FaCalendarAlt />,
      tooltip: "Upcoming Events",
    },
    {
      path: "/student_ssg_eventorganizer_events_attended",
      icon: <FaClipboardCheck />,
      tooltip: "Events Attended",
    },
    {
      path: "/student_ssg_eventorganizer_events",
      icon: <FaRegListAlt />,
      tooltip: "Events",
    },
    {
      path: "/student_ssg_eventorganizer_attendance",
      icon: <FaCheckCircle />,
      tooltip: "Attendance",
    },
    {
      path: "/student_ssg_eventorganizer_records",
      icon: <FaClipboard />,
      tooltip: "Records",
    },
    {
      path: "/student_ssg_eventorganizer_create_event",
      icon: <FaPlusCircle />,
      tooltip: "Create Event",
    },
    {
      path: "/student_ssg_eventorganizer_manage_event",
      icon: <FaClipboardList />,
      tooltip: "Manage Event",
    },
  ];

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
            {navLinks.map((item, index) => (
              <li key={index} title={item.tooltip}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "studentssg-eventorganizer-navigation-link active"
                      : "studentssg-eventorganizer-navigation-link"
                  }
                >
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: User Profile */}
        <div className="studentssg-eventorganizer-navbar-right">
          <div className="studentssg-eventorganizer-profile-container">
            <NavLink
              to="/student_ssg_eventorganizer_profile"
              className={({ isActive }) =>
                isActive
                  ? "studentssg-eventorganizer-navigation-link active"
                  : "studentssg-eventorganizer-navigation-link"
              }
              title="Profile"
            >
              <img
                src={userprofile}
                alt="user profile"
                className="studentssg-eventorganizer-userprofile"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarStudentSSGEventOrganizer;
