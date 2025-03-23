import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import NavbarStudentSSGEventOrganizer from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import search_logo from "../assets/images/search_logo.png";
import "../css/Attendance.css"; // Ensure this CSS file exists
import { FaRegSmileBeam } from "react-icons/fa"; // Face Scan Icon

interface AttendanceProps {
  role: string;
}

const dummyEvents = [
  { name: "Sports Day", date: "January 15, 2025", location: "Sports Complex" },
  { name: "Cultural Night", date: "March 22, 2025", location: "Main Hall" },
  { name: "Science Fair", date: "April 10, 2025", location: "Gymnasium" },
];

interface AttendanceRecord {
  name: string;
  date: string;
  location: string;
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
      name: event.name,
      date: event.date,
      location: event.location,
      yearLevel: "1",
      program: "BS Computer Engineering",
      timeIn: "",
      checkpoint: "",
      timeOut: "",
      studentId: "",
    }))
  );

  const filteredEvents = attendanceRecords.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSubmit = async (index: number) => {
    const record = attendanceRecords[index];

    try {
      const response = await fetch("http://localhost:3001/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error("Failed to submit attendance");
      }

      const data = await response.json();
      console.log("Successfully submitted:", data);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <div className="attendance-section">
        <h3>Attendance</h3>

        {/* Search Bar */}
        <div className="attendance-search">
          <div className="attendance-search-wrapper">
            <img
              src={search_logo}
              alt="search"
              className="attendance-search-icon"
            />
            <input
              type="search"
              placeholder="Search events..."
              className="attendance-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="attendance-table-container">
          <table
            className={`attendance-table ${
              filteredEvents.length === 0 ? "empty-table" : ""
            }`}
          >
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>Year Level</th>
                <th>Program</th>
                <th>Time In</th>
                <th>Checkpoint</th>
                <th>Time Out</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="no-results">
                    No matching events found.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                    <td>{event.location}</td>
                    <td>
                      <select
                        value={event.yearLevel}
                        onChange={(e) =>
                          handleChange(index, "yearLevel", e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5].map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
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
                    </td>
                    {["timeIn", "checkpoint", "timeOut"].map((field) => (
                      <td key={field}>
                        <button className="btn btn-warning btn-sm">
                          <FaRegSmileBeam className="face-scan-icon" /> Face
                          Scan
                        </button>
                        <input
                          type="text"
                          placeholder="Student ID"
                          value={event.studentId}
                          onChange={(e) =>
                            handleChange(index, "studentId", e.target.value)
                          }
                        />
                        <input
                          type="time"
                          value={event[field as keyof AttendanceRecord]}
                          onChange={(e) =>
                            handleChange(
                              index,
                              field as keyof AttendanceRecord,
                              e.target.value
                            )
                          }
                        />
                        <td className="submit-column">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleSubmit(index)}
                          >
                            Submit
                          </button>
                        </td>
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
