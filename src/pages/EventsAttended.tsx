import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { FaSearch } from "react-icons/fa";
import "../css/EventsAttended.css";

interface EventsAttendedProps {
  role: string;
}

const dummyEvents = [
  {
    id: 1,
    name: "Leadership Training",
    date: "April 20, 2025",
    location: "Auditorium",
    status: "Completed",
  },
  {
    id: 2,
    name: "Tech Conference",
    date: "May 5, 2025",
    location: "Main Hall",
    status: "Completed",
  },
  {
    id: 3,
    name: "Music Festival",
    date: "June 15, 2025",
    location: "Outdoor Stage",
    status: "Completed",
  },
  {
    id: 4,
    name: "Charity Marathon",
    date: "July 10, 2025",
    location: "City Park",
    status: "Completed",
  },
];

export const EventsAttended: React.FC<EventsAttendedProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = dummyEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="attended-page">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarStudent />
      )}

      <div className="attended-container">
        <div className="attended-header">
          <h2>Events Attended</h2>
          <p className="subtitle">View all events you've attended</p>
        </div>

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
        </div>

        <div className="table-responsive">
          <table className="attended-table">
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
                filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td data-label="Event Name">{event.name}</td>
                    <td data-label="Date">{event.date}</td>
                    <td data-label="Location">{event.location}</td>
                    <td data-label="Status">
                      <span className="status-badge completed">
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="no-results">
                    {searchTerm
                      ? "No matching events found"
                      : "You haven't attended any events yet"}
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

export default EventsAttended;