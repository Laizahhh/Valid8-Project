import { useState, useEffect } from "react";
import { FaSearch, FaSync } from "react-icons/fa";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";

interface RecordsProps {
  role: string;
}

interface StudentAttendanceRecord {
  student_id: string;
  student_name: string;
  attendances: {
    id: number;
    event_id: number;
    event_name: string;
    time_in: string;
    time_out: string | null;
    status: "present" | "absent" | "excused";
    method: "face_scan" | "manual";
    notes: string | null;
    duration_minutes: number | null;
  }[];
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const Records: React.FC<RecordsProps> = ({ role }) => {
  const [records, setRecords] = useState<StudentAttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_URL}/attendance/students/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch records");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = records.filter(
    (record) =>
      record.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timeString: string) => {
    return new Date(timeString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <span className="badge present">Present</span>;
      case "absent":
        return <span className="badge absent">Absent</span>;
      case "excused":
        return <span className="badge excused">Excused</span>;
      default:
        return <span className="badge unknown">Unknown</span>;
    }
  };

  return (
    <div className="records-container">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <div className="content">
        <div className="header">
          <h1>Student Attendance Records</h1>
          <div className="controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by student ID or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={fetchRecords} disabled={isLoading}>
              <FaSync className={isLoading ? "spin" : ""} />
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="records-list">
          {isLoading ? (
            <div className="loading">Loading records...</div>
          ) : filteredRecords.length === 0 ? (
            <div className="no-results">
              {searchTerm
                ? "No matching records found"
                : "No attendance records available"}
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div key={record.student_id} className="student-card">
                <div className="student-header">
                  <h3>{record.student_name}</h3>
                  <span className="student-id">{record.student_id}</span>
                </div>

                <div className="attendances">
                  {record.attendances.length === 0 ? (
                    <div className="no-attendance">No attendance records</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Status</th>
                          <th>Time In</th>
                          <th>Time Out</th>
                          <th>Duration</th>
                          <th>Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.attendances.map((attendance) => (
                          <tr key={attendance.id}>
                            <td>{attendance.event_name}</td>
                            <td>{getStatusBadge(attendance.status)}</td>
                            <td>
                              {formatTime(attendance.time_in)}
                              <div className="date">
                                {formatDate(attendance.time_in)}
                              </div>
                            </td>
                            <td>
                              {attendance.time_out ? (
                                <>
                                  {formatTime(attendance.time_out)}
                                  <div className="date">
                                    {formatDate(attendance.time_out)}
                                  </div>
                                </>
                              ) : (
                                "Not recorded"
                              )}
                            </td>
                            <td>
                              {attendance.duration_minutes !== null
                                ? `${attendance.duration_minutes} mins`
                                : "N/A"}
                            </td>
                            <td className="method">
                              {attendance.method === "face_scan"
                                ? "Face Scan"
                                : "Manual"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .records-container {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .content {
          margin-top: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .controls {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          color: #666;
        }

        .search-box input {
          padding: 8px 10px 8px 35px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 250px;
        }

        button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .error-message {
          color: #d32f2f;
          background: #ffebee;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .student-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          overflow: hidden;
        }

        .student-header {
          padding: 15px 20px;
          background: #f5f5f5;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .student-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .student-id {
          color: #666;
          font-size: 14px;
        }

        .attendances {
          padding: 15px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f9f9f9;
          font-weight: 600;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge.present {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .badge.absent {
          background: #ffebee;
          color: #c62828;
        }

        .badge.excused {
          background: #fff8e1;
          color: #f57f17;
        }

        .date {
          font-size: 12px;
          color: #666;
          margin-top: 3px;
        }

        .method {
          text-transform: capitalize;
        }

        .loading,
        .no-results,
        .no-attendance {
          padding: 20px;
          text-align: center;
          color: #666;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-box input {
            width: 200px;
          }

          table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Records;
