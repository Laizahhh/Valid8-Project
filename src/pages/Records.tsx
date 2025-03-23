import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import "../css/Records.css";
import search_logo from "../assets/images/search_logo.png";

interface RecordsProps {
  role: string;
}

// Dummy student records
const dummyRecords = [
  {
    studentId: "2025-001",
    name: "Doe, John",
    yearLevel: "2nd Year",
    program: "BS Computer Science",
    event: "Tech Conference",
    status: "Attended",
  },
  {
    studentId: "2025-002",
    name: "Smith, Alice",
    yearLevel: "3rd Year",
    program: "BS Information Technology",
    event: "AI Workshop",
    status: "Absent",
  },
  {
    studentId: "2025-003",
    name: "Johnson, Michael",
    yearLevel: "1st Year",
    program: "BS Software Engineering",
    event: "Hackathon",
    status: "Attended",
  },
  {
    studentId: "2025-004",
    name: "Brown, Emma",
    yearLevel: "4th Year",
    program: "BS Data Science",
    event: "Machine Learning Seminar",
    status: "Pending",
  },
];

export const Records: React.FC<RecordsProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = dummyRecords.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="records-header">
      {/* Dynamically select the navbar based on the role */}
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
        <h3>Student Records</h3>

        <div className="search-records">
          <input
            type="search"
            placeholder="Search students..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search_logo} alt="search" className="search-icon" />
        </div>

        <div className="records-table">
          <table>
            <thead>
              <tr>
                <th className="records-student-id">Student ID</th>
                <th className="records-name">Name</th>
                <th className="records-year-level">Year Level</th>
                <th className="records-program">Program</th>
                <th className="records-event">Event</th>
                <th className="records-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.studentId}</td>
                  <td>{record.name}</td>
                  <td>{record.yearLevel}</td>
                  <td>{record.program}</td>
                  <td>{record.event}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={6}>No matching records found.</td>
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
