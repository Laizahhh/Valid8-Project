import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { NavbarSSG } from "../components/NavbarSSG";
import "../css/UpcomingEvents.css";
import search_logo from "../assets/images/search_logo.png";

interface EventsProps {
  role: string;
}

// Updated dummy events
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
];

export const Events: React.FC<EventsProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = dummyEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="upcoming-header">
      {/* Dynamically select the navbar based on the role */}
      {role === "admin" ? (
        <NavbarAdmin />
      ) : role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <div className="upcoming-events container small-container">
        <h3>Events</h3>

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

        <div className="upcoming-events-table">
          <table>
            <thead>
              <tr>
                <th className="eventname">Event Name</th>
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
                  <td colSpan={4}>No matching events found.</td>
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
