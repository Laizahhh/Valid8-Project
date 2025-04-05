import { useState } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import { FaSearch } from "react-icons/fa";
import "../css/Records.css";

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
    <div className="records-page">
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
        <div className="records-header">
          <h2>Student Records</h2>
          <p className="subtitle">View and manage student attendance records</p>
        </div>

        <div className="search-filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="records-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Year Level</th>
                <th>Program</th>
                <th>Event</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.studentId}</td>
                    <td>{record.name}</td>
                    <td>{record.yearLevel}</td>
                    <td>{record.program}</td>
                    <td>{record.event}</td>
                    <td>
                      <span
                        className={`status-badge ${record.status.toLowerCase()}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-results">
                    No matching records found
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
