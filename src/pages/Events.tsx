import { useState } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import search_logo from "../assets/images/search_logo.png";
import { FaFilter } from "react-icons/fa"; // Import filter icon
import "../css/Events.css";
import NavbarSSG from "../components/NavbarSSG";

interface EventsProps {
  role: string;
}

// Sample dummy events
const dummyEvents = [
  {
    name: "Leadership Training",
    date: "April 20, 2025",
    location: "Auditorium",
    status: "Active",
  },
  {
    name: "Tech Conference",
    date: "May 5, 2025",
    location: "Main Hall",
    status: "Active",
  },
  {
    name: "Music Festival",
    date: "June 15, 2025",
    location: "Outdoor Stage",
    status: "Active",
  },
  {
    name: "Charity Marathon",
    date: "July 10, 2025",
    location: "City Park",
    status: "Active",
  },
  {
    name: "Alumni Meet",
    date: "March 5, 2024",
    location: "Community Center",
    status: "Past",
  },
  {
    name: "Science Fair",
    date: "February 12, 2024",
    location: "Lab Hall",
    status: "Past",
  },
];

export const Events: React.FC<EventsProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Apply filters based on event status
  const filteredEvents = dummyEvents
    .filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => {
      if (filter === "active") return event.status === "Active";
      if (filter === "past") return event.status === "Past";
      return true;
    });

  return (
    <div className="upcoming-header">
      {/* ✅ Fixed Navbar Conditional Rendering */}
      {role === "admin" && <NavbarAdmin />}
      {role === "student-ssg" && <NavbarStudentSSG />}
      {role === "ssg" && <NavbarSSG />}
      {role === "student-ssg-eventorganizer" && (
        <NavbarStudentSSGEventOrganizer />
      )}

      <div className="upcoming-events container small-container">
        <h3>Events</h3>

        {/* Search Bar & Filter */}
        <div className="d-flex align-items-center gap-3">
          {/* Restored Original Search Box */}
          <div className="search-upcoming">
            <input
              type="search"
              placeholder="Search events..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search_logo} alt="search" className="search-icon" />
          </div>

          {/* Filter Button & Dropdown */}
          <div className="position-relative">
            <button
              className="btn btn-outline-secondary filter-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaFilter size={18} />
            </button>
            {dropdownOpen && (
              <div className="filter-dropdown">
                <button
                  className={`dropdown-item ${
                    filter === "all" ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilter("all");
                    setDropdownOpen(false);
                  }}
                >
                  All Events
                </button>
                <button
                  className={`dropdown-item ${
                    filter === "active" ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilter("active");
                    setDropdownOpen(false);
                  }}
                >
                  Active Events
                </button>
                <button
                  className={`dropdown-item ${
                    filter === "past" ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilter("past");
                    setDropdownOpen(false);
                  }}
                >
                  Past Events
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Events Table */}
        <div className="upcoming-events-table mt-3">
          <table>
            <thead>
              <tr>
                <th className="eventname">Event</th>
                <th className="date">Date</th>
                <th className="location">Location</th>
                <th className="status">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.status}</td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No matching events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
