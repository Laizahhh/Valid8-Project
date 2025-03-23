import { useState, useEffect } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import search_logo from "../assets/images/search_logo.png"; // Adjust the path based on your structure
import { FaDownload } from "react-icons/fa"; // Import download icon
import "../css/Reports.css";

interface Event {
  name: string;
  date: string;
  location: string;
  attendees: string[]; // Array of student names
}

export const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      name: "Science Fair",
      date: "2025-04-10",
      location: "Auditorium",
      attendees: ["John Doe", "Jane Smith", "Emily Davis"],
    },
    {
      name: "Sports Fest",
      date: "2025-05-02",
      location: "School Grounds",
      attendees: ["Michael Johnson", "Alice Brown", "David Lee"],
    },
  ]);

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  // Function to generate and download a CSV attendance report
  const handleDownloadReport = (event: Event) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `Event Name:,${event.name}\nDate:,${event.date}\nLocation:,${event.location}\n\nAttendees:\n` +
      event.attendees.map((attendee) => `${attendee}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${event.name}_attendance.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="upcoming-events container small-container">
        <h3>Reports</h3>

        {/* Search Bar */}
        <div className="search-reports">
          <input
            type="search"
            placeholder="Search events..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search_logo} alt="search" className="search-icon" />
        </div>

        {/* Events Table */}
        <div className="upcoming-events-table">
          <table>
            <thead>
              <tr>
                <th className="eventname">Event</th>
                <th className="date">Date</th>
                <th className="location">Location</th>
                <th className="download">Download Files</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDownloadReport(event)}
                    >
                      <FaDownload /> Generate Report
                    </button>
                  </td>
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

export default Reports;
