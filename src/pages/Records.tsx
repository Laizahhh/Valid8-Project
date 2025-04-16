import { useState, useEffect } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import { FaSearch } from "react-icons/fa";
import { fetchStudentRecords } from "../api/recordsApi"; // Import the fetch function
import "../css/Records.css";

interface RecordsProps {
  role: string;
}

export const Records: React.FC<RecordsProps> = ({ role }) => {
  const [studentRecords, setStudentRecords] = useState<any[]>([]); // State to store student records
  const [searchTerm, setSearchTerm] = useState(""); // For search filter

  // Fetch the student records when the component mounts
  useEffect(() => {
    const getRecords = async () => {
      try {
        const records = await fetchStudentRecords();
        setStudentRecords(records); // Update state with the fetched records
      } catch (error) {
        console.error("Error fetching student records:", error);
      }
    };

    getRecords();
  }, []);

  const filteredRecords = studentRecords.filter((record) =>
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
                    <td data-label="Student ID">{record.studentId}</td>
                    <td data-label="Name">{record.name}</td>
                    <td data-label="Year Level">{record.yearLevel}</td>
                    <td data-label="Program">{record.program}</td>
                    <td data-label="Event">{record.event}</td>
                    <td data-label="Status">
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
