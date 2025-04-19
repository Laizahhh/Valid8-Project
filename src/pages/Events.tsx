import { useState, useEffect } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { FaFilter, FaSearch, FaDownload } from "react-icons/fa";
import "../css/Events.css";
import NavbarSSG from "../components/NavbarSSG";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

interface EventsProps {
  role: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: string;
  programs?: Program[];
}

interface Program {
  name: string;
  attendees: string[];
  absentees: string[];
}

export const Events: React.FC<EventsProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Set up event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const [upcomingResponse, activeResponse, attendedResponse] =
          await Promise.all([
            fetch(`${BASE_URL}/upcomingEvents`),
            fetch(`${BASE_URL}/activeEvents`),
            fetch(`${BASE_URL}/eventsAttended`),
          ]);

        if (
          !upcomingResponse.ok ||
          !activeResponse.ok ||
          !attendedResponse.ok
        ) {
          throw new Error("Failed to fetch data from the server");
        }

        const upcomingData = await upcomingResponse.json();
        const activeData = await activeResponse.json();
        const attendedData = await attendedResponse.json();

        // Transform attended events to have consistent status
        const transformedAttendedData = attendedData.map((event: any) => ({
          ...event,
          status:
            event.status === "Present" || event.status === "Absent"
              ? "Past"
              : event.status,
        }));

        // Combine all events
        const combinedEvents = [
          ...upcomingData,
          ...activeData,
          ...transformedAttendedData,
        ];

        setEvents(combinedEvents);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events data. Please try again later.");
        setLoading(false);
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [role]);

  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => {
      if (filter === "upcoming") return event.status === "Upcoming";
      if (filter === "active") return event.status === "Active";
      if (filter === "past") return event.status === "Past";
      return true;
    });

  const handleEventClick = (event: Event) => {
    if (event.status === "Past") {
      setSelectedEvent(event);
      setSelectedProgram("All");
    }
  };

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
                    filter === "upcoming" ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilter("upcoming");
                    setDropdownOpen(false);
                  }}
                >
                  Upcoming Events
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

        {/* Loading and Error States */}
        {loading && <div className="loading-indicator">Loading events...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Events Table */}
        {!loading && !error && (
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
                  filteredEvents.map((event) => (
                    <tr
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={event.status === "Past" ? "clickable-row" : ""}
                    >
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
        )}
      </div>
    </div>
  );
};

export default Events;
