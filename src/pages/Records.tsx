import { useState, useEffect } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import { FaSearch } from "react-icons/fa";
import "../css/Records.css";

interface RecordsProps {
  role: string;
}

interface StudentRecord {
  id: string;
  studentId: string;
  name: string;
  yearLevel: string;
  program: string;
  eventId: string;
  eventName: string;
  attendanceStatus: "Present" | "Absent";
  timeIn?: string;
  timeOut?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

export const Records: React.FC<RecordsProps> = ({ role }) => {
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch student records from API
  const fetchStudentRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/eventsAttended`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const eventsData = await response.json();

      // Transform the API data to match our StudentRecord interface
      const records: StudentRecord[] = eventsData.flatMap((event: any) => {
        return event.attendees.map((attendee: any) => ({
          id: `${event.id}-${attendee.userId}`,
          studentId: attendee.userId.toString(),
          name: attendee.email.split("@")[0].replace(".", " "), // Format name from email
          yearLevel: attendee.yearLevel || "N/A", // Dynamic from API
          program: event.programs[0]?.name || "N/A",
          eventId: event.id,
          eventName: event.name,
          attendanceStatus: event.attendanceStatus,
          timeIn: attendee.timeIn,
          timeOut: attendee.timeOut,
        }));
      });

      setStudentRecords(records);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch records");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentRecords();
  }, []);

  const filteredRecords = studentRecords.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceBadgeClass = (status: "Present" | "Absent") => {
    return status === "Present"
      ? "status-badge-present"
      : "status-badge-absent";
  };

  const handleRefresh = () => {
    fetchStudentRecords();
  };

  return (
    <div className="records-page">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <div className="records-container">
        <div className="records-header">
          <h2>Student Attendance Records</h2>
          <div className="header-controls">
            <p className="subtitle">
              View and manage student attendance records
            </p>
            <button
              className="btn btn-refresh"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        <div className="search-filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, ID, or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            Error loading records: {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="records-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Year</th>
                <th>Program</th>
                <th>Event</th>
                <th>Attendance</th>
                <th>Time In</th>
                <th>Time Out</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="loading-row">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td data-label="Student ID">{record.studentId}</td>
                    <td data-label="Name">{record.name}</td>
                    <td data-label="Year">{record.yearLevel}</td>
                    <td data-label="Program">{record.program}</td>
                    <td data-label="Event">{record.eventName}</td>
                    <td data-label="Attendance">
                      <span
                        className={getAttendanceBadgeClass(
                          record.attendanceStatus
                        )}
                      >
                        {record.attendanceStatus}
                        {record.attendanceStatus === "Present" ? " ✅" : " ❌"}
                      </span>
                    </td>
                    {/* Updated Time In/Out cells */}
                    <td data-label="Time In">
                      {
                        record.attendanceStatus === "Present" && record.timeIn
                          ? new Date(record.timeIn).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Not Attended" // 👈 Placeholder for absent/no data
                      }
                    </td>
                    <td data-label="Time Out">
                      {
                        record.attendanceStatus === "Present" && record.timeOut
                          ? new Date(record.timeOut).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Not Attended" // 👈 Placeholder for absent/no data
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="no-results">
                    {searchTerm
                      ? "No matching records found"
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

export default Records;
