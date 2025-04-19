import { useState, useEffect } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { FaSearch } from "react-icons/fa";
import { fetchEventsAttended, Event } from "../api/eventsApi";
import "../css/EventsAttended.css";

interface EventsAttendedProps {
  role: string;
}

interface AttendanceEvent extends Event {
  attendanceStatus: "Present" | "Absent"; // More specific type for attendance
}

export const EventsAttended: React.FC<EventsAttendedProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<AttendanceEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const fetchedEvents = await fetchEventsAttended();
        // Transform status to attendance status if needed
        const attendanceEvents = fetchedEvents.map((event) => ({
          ...event,
          attendanceStatus: event.status === "Completed" ? "Present" : "Absent",
        }));
        setEvents(attendanceEvents);
      } catch (error) {
        console.error("Error fetching attended events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to determine badge class based on attendance status
  const getAttendanceBadgeClass = (status: "Present" | "Absent") => {
    return status === "Present"
      ? "status-badge-present"
      : "status-badge-absent";
  };

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
          <p className="subtitle">View your event attendance records</p>
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
                <th>Attendance Status</th> {/* Changed from Status */}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>Loading attendance records...</td>
                </tr>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td data-label="Event Name">{event.name}</td>
                    <td data-label="Date">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td data-label="Location">{event.location}</td>
                    <td data-label="Attendance Status">
                      <span
                        className={getAttendanceBadgeClass(
                          event.attendanceStatus
                        )}
                      >
                        {event.attendanceStatus}
                        {event.attendanceStatus === "Present" ? " ✅" : " ❌"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="no-results">
                    {searchTerm
                      ? "No matching attendance records found"
                      : "No attendance records available"}
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
