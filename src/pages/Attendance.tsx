import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import NavbarStudentSSGEventOrganizer from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import search_logo from "../assets/images/search_logo.png";
import "../css/Attendance.css";
import { FaRegSmileBeam } from "react-icons/fa";
import { FiClock, FiMapPin, FiCalendar } from "react-icons/fi";

interface AttendanceProps {
  role: string;
}

const dummyEvents = [
  {
    name: "Sports Day",
    date: "January 15, 2025",
    location: "Sports Complex",
    description: "Annual sports competition between departments",
  },
  {
    name: "Cultural Night",
    date: "March 22, 2025",
    location: "Main Hall",
    description: "Showcase of diverse cultural performances",
  },
  {
    name: "Science Fair",
    date: "April 10, 2025",
    location: "Gymnasium",
    description: "Exhibition of student research projects",
  },
];

interface AttendanceRecord {
  name: string;
  date: string;
  location: string;
  description: string;
  yearLevel: string;
  program: string;
  timeIn: string;
  checkpoint: string;
  timeOut: string;
  studentId: string;
}

export const Attendance: React.FC<AttendanceProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >(
    dummyEvents.map((event) => ({
      ...event,
      yearLevel: "1",
      program: "BS Computer Engineering",
      timeIn: "",
      checkpoint: "",
      timeOut: "",
      studentId: "",
    }))
  );

  const filteredEvents = attendanceRecords.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = <K extends keyof AttendanceRecord>(
    index: number,
    field: K,
    value: AttendanceRecord[K]
  ) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record, i) =>
        i === index ? { ...record, [field]: value } : record
      )
    );
  };

  const handleSubmit = async (
    index: number,
    type: "timeIn" | "checkpoint" | "timeOut"
  ) => {
    const record = attendanceRecords[index];

    if (!record.studentId) {
      alert("Please enter Student ID");
      return;
    }

    const now = new Date();
    const timeString = now.toTimeString().substring(0, 5);

    const updatedRecord = {
      ...record,
      [type]: timeString,
    };

    try {
      const response = await fetch("http://localhost:3001/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error("Failed to submit attendance");
      }

      const data = await response.json();
      console.log("Successfully submitted:", data);

      setAttendanceRecords((prev) =>
        prev.map((r, i) => (i === index ? updatedRecord : r))
      );
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance. Please try again.");
    }
  };

  return (
    <div className="attendance-page">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <div className="attendance-container">
        <div className="attendance-header">
          <div className="header-content">
            <h2 className="attendance-title">Attendance Monitoring System</h2>
            <p className="attendance-subtitle">
              Official record keeping for university events and activities
            </p>
          </div>

          <div className="attendance-search-container">
            <div className="attendance-search-box">
              <img
                src={search_logo}
                alt="search"
                className="attendance-search-icon"
              />
              <input
                type="search"
                placeholder="Search events or descriptions..."
                className="attendance-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="attendance-content">
          {filteredEvents.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <p>No matching events found</p>
                <small>Please try a different search term</small>
              </div>
            </div>
          ) : (
            <div className="attendance-cards">
              {filteredEvents.map((event, index) => (
                <div key={index} className="attendance-card">
                  <div className="card-header">
                    <div className="event-badge">EVENT</div>
                    <h3>{event.name}</h3>
                    <div className="event-details">
                      <span>
                        <FiCalendar className="detail-icon" /> {event.date}
                      </span>
                      <span>
                        <FiMapPin className="detail-icon" /> {event.location}
                      </span>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>

                  <div className="card-body">
                    <div className="form-section">
                      <div className="form-group">
                        <label>Year Level</label>
                        <select
                          value={event.yearLevel}
                          onChange={(e) =>
                            handleChange(index, "yearLevel", e.target.value)
                          }
                        >
                          {[1, 2, 3, 4, 5].map((level) => (
                            <option key={level} value={level}>
                              Year {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Program</label>
                        <select
                          value={event.program}
                          onChange={(e) =>
                            handleChange(index, "program", e.target.value)
                          }
                        >
                          {[
                            "BS Computer Engineering",
                            "BS Electrical Engineering",
                            "BS Electronics Engineering",
                            "BS Civil Engineering",
                          ].map((program) => (
                            <option key={program} value={program}>
                              {program}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Student ID</label>
                        <input
                          type="text"
                          placeholder="Enter student ID"
                          value={event.studentId}
                          onChange={(e) =>
                            handleChange(index, "studentId", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="time-records-section">
                      <div className="time-record">
                        <h4>Time In</h4>
                        <div className="time-input-group">
                          <button
                            className="btn face-scan-btn"
                            onClick={() => handleSubmit(index, "timeIn")}
                          >
                            <FaRegSmileBeam className="face-scan-icon" /> Scan
                          </button>
                          <div className="time-display">
                            {event.timeIn ? (
                              <span className="recorded">
                                <FiClock /> {event.timeIn}
                              </span>
                            ) : (
                              <span className="pending">Not recorded</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="time-record">
                        <h4>Checkpoint</h4>
                        <div className="time-input-group">
                          <button
                            className="btn face-scan-btn"
                            onClick={() => handleSubmit(index, "checkpoint")}
                          >
                            <FaRegSmileBeam className="face-scan-icon" /> Scan
                          </button>
                          <div className="time-display">
                            {event.checkpoint ? (
                              <span className="recorded">
                                <FiClock /> {event.checkpoint}
                              </span>
                            ) : (
                              <span className="pending">Not recorded</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="time-record">
                        <h4>Time Out</h4>
                        <div className="time-input-group">
                          <button
                            className="btn face-scan-btn"
                            onClick={() => handleSubmit(index, "timeOut")}
                          >
                            <FaRegSmileBeam className="face-scan-icon" /> Scan
                          </button>
                          <div className="time-display">
                            {event.timeOut ? (
                              <span className="recorded">
                                <FiClock /> {event.timeOut}
                              </span>
                            ) : (
                              <span className="pending">Not recorded</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
