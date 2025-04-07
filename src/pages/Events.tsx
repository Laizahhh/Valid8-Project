import { useState } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { FaFilter, FaSearch } from "react-icons/fa";
import "../css/Events.css";
import NavbarSSG from "../components/NavbarSSG";

interface EventsProps {
  role: string;
}

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
    <div className="events-page">
      {/* Navbar Conditional Rendering */}
      {role === "admin" && <NavbarAdmin />}
      {role === "student-ssg" && <NavbarStudentSSG />}
      {role === "ssg" && <NavbarSSG />}
      {role === "student-ssg-eventorganizer" && (
        <NavbarStudentSSGEventOrganizer />
      )}

      <div className="events-container">
        <div className="events-header">
          <h2>Events</h2>
          <p className="subtitle">View and manage all events</p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <button
              className="filter-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaFilter /> Filter
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
        <div className="table-responsive">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td data-label="Event Name">{event.name}</td>
                    <td data-label="Date">{event.date}</td>
                    <td data-label="Location">{event.location}</td>
                    <td data-label="Status">
                      <span
                        className={`status-badge ${event.status.toLowerCase()}`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="no-results">
                    No matching events found
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
