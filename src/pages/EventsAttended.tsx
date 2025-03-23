import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import "../css/EventsAttended.css";
import search_logo from "../assets/images/search_logo.png";

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
    <div className="attended-header">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarStudent />
      )}

      <div className="attended-events container small-container">
        <h3>Events Attended</h3>

        <div className="search-attended">
          <input
            type="search"
            placeholder="Search events..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search_logo} alt="search" className="search-icon" />
        </div>

        <div className="attended-events-table">
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
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.status}</td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    {searchTerm
                      ? "No matching events found."
                      : "You haven't attended any events yet."}
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
