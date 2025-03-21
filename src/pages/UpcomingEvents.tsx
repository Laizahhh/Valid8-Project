import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import "../css/UpcomingEvents.css";
import search_logo from "../assets/images/search_logo.png";

interface UpcomingEventsProps {
  role: string;
}

// Dummy data for testing
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
    <div className="upcoming-header">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarStudent />
      )}

      <div className="upcoming-events container small-container">
        <h3>Upcoming Events</h3>

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

export default UpcomingEvents;
