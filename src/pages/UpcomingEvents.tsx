import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { FaSearch } from "react-icons/fa";
import "../css/UpcomingEvents.css";

interface UpcomingEventsProps {
  role: string;
}

const dummyEvents = [
  {
    name: "Sports Day",
    date: "January 15, 2025",
    location: "Sports Complex",
    status: "Ongoing",
  },
  {
    name: "Cultural Night",
    date: "March 22, 2025",
    location: "Main Hall",
    status: "Upcoming",
  },
  {
    name: "Science Fair",
    date: "April 10, 2025",
    location: "Gymnasium",
    status: "Upcoming",
  },
  {
    name: "Art Exhibit",
    date: "May 5, 2025",
    location: "Art Gallery",
    status: "Completed",
  },
];

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = dummyEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="upcoming-page">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarStudent />
      )}

      <div className="upcoming-container">
        <div className="upcoming-header">
          <h2>Upcoming Events</h2>
          <p className="subtitle">View and manage upcoming events</p>
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
          <table className="upcoming-table">
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
                      <span className={`status-badge ${event.status.toLowerCase()}`}>
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

export default UpcomingEvents;