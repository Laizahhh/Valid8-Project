import { useState, useEffect } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import search_logo from "../assets/images/search_logo.png";
import { FaDownload } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Modal from "react-modal";
import "../css/Reports.css";

interface Program {
  name: string;
  attendees: string[];
  absentees: string[];
}

interface Event {
  name: string;
  date: string;
  location: string;
  programs: Program[];
}

export const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      name: "Annual Science Fair",
      date: "2025-04-10",
      location: "Main Auditorium",
      programs: [
        {
          name: "BS Civil Engineering",
          attendees: [
            "John Doe",
            "Jane Smith",
            "Robert Johnson",
            "Maria Garcia",
          ],
          absentees: ["Emily Davis", "James Wilson"],
        },
        {
          name: "BS Computer Engineering",
          attendees: ["Michael Johnson", "Sarah Williams", "David Brown"],
          absentees: ["Alice Brown", "Thomas Taylor"],
        },
        {
          name: "BS Electrical Engineering",
          attendees: ["David Lee", "Jennifer Martinez", "Christopher Anderson"],
          absentees: ["Sarah Connor", "Daniel Thomas"],
        },
        {
          name: "BS Electronics Engineering",
          attendees: ["Eve Adams", "Matthew White", "Jessica Clark"],
          absentees: ["Tom Cruise", "Lisa Walker"],
        },
      ],
    },
    {
      name: "University Sports Festival",
      date: "2025-05-02",
      location: "University Sports Complex",
      programs: [
        {
          name: "BS Civil Engineering",
          attendees: ["Michael Johnson", "Robert Johnson", "Maria Garcia"],
          absentees: ["John Doe", "Emily Davis"],
        },
        {
          name: "BS Computer Engineering",
          attendees: ["Alice Brown", "David Brown", "Sarah Williams"],
          absentees: ["Jane Smith", "Thomas Taylor"],
        },
        {
          name: "BS Electrical Engineering",
          attendees: ["David Lee", "Christopher Anderson", "Daniel Thomas"],
          absentees: ["Emily Davis", "Sarah Connor"],
        },
        {
          name: "BS Electronics Engineering",
          attendees: ["Tom Cruise", "Matthew White", "Jessica Clark"],
          absentees: ["Eve Adams", "Lisa Walker"],
        },
      ],
    },
    {
      name: "Engineering Symposium",
      date: "2025-06-15",
      location: "Engineering Building",
      programs: [
        {
          name: "BS Civil Engineering",
          attendees: ["John Doe", "Maria Garcia", "James Wilson"],
          absentees: ["Emily Davis", "Robert Johnson"],
        },
        {
          name: "BS Computer Engineering",
          attendees: ["Michael Johnson", "Alice Brown", "Thomas Taylor"],
          absentees: ["Sarah Williams", "David Brown"],
        },
        {
          name: "BS Electrical Engineering",
          attendees: ["David Lee", "Sarah Connor", "Christopher Anderson"],
          absentees: ["Jennifer Martinez", "Daniel Thomas"],
        },
        {
          name: "BS Electronics Engineering",
          attendees: ["Eve Adams", "Tom Cruise", "Lisa Walker"],
          absentees: ["Matthew White", "Jessica Clark"],
        },
      ],
    },
  ]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleViewReport = (event: Event) => {
    setSelectedEvent(event);
    setSelectedProgram("All");
  };

  const handleDownloadReport = (event: Event) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      `Event Name:,${event.name}\nDate:,${event.date}\nLocation:,${event.location}\n\n` +
      event.programs
        .map(
          (program) =>
            `Program:,${program.name}\nTotal Attendees:,${
              program.attendees.length
            }\nTotal Absentees:,${
              program.absentees.length
            }\nAttendees:\n${program.attendees.join(
              "\n"
            )}\nAbsentees:\n${program.absentees.join("\n")}\n`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${event.name.replace(/\s+/g, "_")}_attendance_report.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getProgramData = () => {
    if (!selectedEvent) return [];

    return selectedEvent.programs.map((program) => ({
      name: program.name,
      attendees: program.attendees.length,
      absentees: program.absentees.length,
      total: program.attendees.length + program.absentees.length,
      attendanceRate:
        Math.round(
          program.attendees.length /
            (program.attendees.length + program.absentees.length)
        ) * 100,
    }));
  };

  return (
    <div className="reports-page">
      <NavbarAdmin />
      <div className="reports-container">
        <header className="reports-header">
          <h2>Event Attendance Reports</h2>
          <p className="subtitle">
            View and download detailed attendance records for university events
          </p>
        </header>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-box">
            <img src={search_logo} alt="search" className="search-icon" />
            <input
              type="search"
              placeholder="Search events by name..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Events Table */}
        <div className="table-responsive">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index}>
                  <td data-label="Event Name">{event.name}</td>
                  <td data-label="Date">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td data-label="Location">{event.location}</td>
                  <td data-label="Actions" className="actions-cell">
                    <div className="button-group">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleViewReport(event)}
                      >
                        View Report
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDownloadReport(event)}
                        aria-label="Download report"
                      >
                        <FaDownload /> {!isMobile && "Download"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={4} className="no-results">
                    No matching events found. Try a different search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Report Modal */}
        {selectedEvent && (
          <Modal
            isOpen={true}
            onRequestClose={() => setSelectedEvent(null)}
            ariaHideApp={false}
            className="report-modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-header">
              <h3>{selectedEvent.name} - Attendance Report</h3>
              <p className="event-details">
                <span>
                  {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span> • </span>
                <span>{selectedEvent.location}</span>
              </p>
            </div>

            {/* Filter Dropdown */}
            <div className="filter-section">
              <label htmlFor="program-filter">Filter by Program:</label>
              <select
                id="program-filter"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="program-filter"
              >
                <option value="All">All Programs</option>
                {selectedEvent.programs.map((program, index) => (
                  <option key={index} value={program.name}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Attendance Summary */}
            <div className="summary-section">
              <h4>Attendance Summary</h4>
              <div className="summary-cards">
                <div className="summary-card total">
                  <span className="card-title">Total Participants</span>
                  <span className="card-value">
                    {selectedProgram === "All"
                      ? selectedEvent.programs.reduce(
                          (sum, program) =>
                            sum +
                            program.attendees.length +
                            program.absentees.length,
                          0
                        )
                      : (selectedEvent.programs.find(
                          (p) => p.name === selectedProgram
                        )?.attendees.length || 0) +
                        (selectedEvent.programs.find(
                          (p) => p.name === selectedProgram
                        )?.absentees.length || 0)}
                  </span>
                </div>
                <div className="summary-card present">
                  <span className="card-title">Attendees</span>
                  <span className="card-value">
                    {selectedProgram === "All"
                      ? selectedEvent.programs.reduce(
                          (sum, program) => sum + program.attendees.length,
                          0
                        )
                      : selectedEvent.programs.find(
                          (p) => p.name === selectedProgram
                        )?.attendees.length || 0}
                  </span>
                </div>
                <div className="summary-card absent">
                  <span className="card-title">Absentees</span>
                  <span className="card-value">
                    {selectedProgram === "All"
                      ? selectedEvent.programs.reduce(
                          (sum, program) => sum + program.absentees.length,
                          0
                        )
                      : selectedEvent.programs.find(
                          (p) => p.name === selectedProgram
                        )?.absentees.length || 0}
                  </span>
                </div>
                <div className="summary-card rate">
                  <span className="card-title">Attendance Rate</span>
                  <span className="card-value">
                    {selectedProgram === "All"
                      ? `${Math.round(
                          (selectedEvent.programs.reduce(
                            (sum, program) => sum + program.attendees.length,
                            0
                          ) /
                            selectedEvent.programs.reduce(
                              (sum, program) =>
                                sum +
                                program.attendees.length +
                                program.absentees.length,
                              0
                            )) *
                            100
                        )}%`
                      : `${Math.round(
                          ((selectedEvent.programs.find(
                            (p) => p.name === selectedProgram
                          )?.attendees.length || 0) /
                            ((selectedEvent.programs.find(
                              (p) => p.name === selectedProgram
                            )?.attendees.length || 0) +
                              (selectedEvent.programs.find(
                                (p) => p.name === selectedProgram
                              )?.absentees.length || 0))) *
                            100
                        )}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              <div className="chart-container">
                <h5>Attendance Distribution</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Present",
                          value:
                            selectedProgram === "All"
                              ? selectedEvent.programs.reduce(
                                  (sum, program) =>
                                    sum + program.attendees.length,
                                  0
                                )
                              : selectedEvent.programs.find(
                                  (p) => p.name === selectedProgram
                                )?.attendees.length || 0,
                        },
                        {
                          name: "Absent",
                          value:
                            selectedProgram === "All"
                              ? selectedEvent.programs.reduce(
                                  (sum, program) =>
                                    sum + program.absentees.length,
                                  0
                                )
                              : selectedEvent.programs.find(
                                  (p) => p.name === selectedProgram
                                )?.absentees.length || 0,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      <Cell fill="#4CAF50" />
                      <Cell fill="#F44336" />
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} participants`, ""]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {selectedProgram === "All" && (
                <div className="chart-container">
                  <h5>Attendance by Program</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={getProgramData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout={isMobile ? "vertical" : "horizontal"}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      {isMobile ? (
                        <YAxis
                          type="category"
                          dataKey="name"
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                        />
                      ) : (
                        <XAxis
                          type="category"
                          dataKey="name"
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                        />
                      )}
                      {isMobile ? (
                        <XAxis type="number" />
                      ) : (
                        <YAxis type="number" />
                      )}
                      <Tooltip
                        formatter={(value) => [`${value} participants`, ""]}
                      />
                      <Legend />
                      <Bar
                        dataKey="attendees"
                        name="Attendees"
                        fill="#4CAF50"
                      />
                      <Bar
                        dataKey="absentees"
                        name="Absentees"
                        fill="#F44336"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Detailed Data */}
            <div className="detailed-data">
              <h5>Detailed Attendance Records</h5>
              {selectedProgram === "All" ? (
                selectedEvent.programs.map((program, index) => (
                  <div key={index} className="program-section">
                    <h6>{program.name}</h6>
                    <div className="participants-grid">
                      <div className="participants-column">
                        <h6>Attendees ({program.attendees.length})</h6>
                        <ul>
                          {program.attendees.map((attendee, i) => (
                            <li key={i}>{attendee}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="participants-column">
                        <h6>Absentees ({program.absentees.length})</h6>
                        <ul>
                          {program.absentees.map((absentee, i) => (
                            <li key={i}>{absentee}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="program-section">
                  <h6>{selectedProgram}</h6>
                  <div className="participants-grid">
                    <div className="participants-column">
                      <h6>
                        Attendees (
                        {selectedEvent.programs.find(
                          (p) => p.name === selectedProgram
                        )?.attendees.length || 0}
                        )
                      </h6>
                      <ul>
                        {selectedEvent.programs
                          .find((p) => p.name === selectedProgram)
                          ?.attendees.map((attendee, i) => (
                            <li key={i}>{attendee}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="participants-column">
                      <h6>
                        Absentees (
                        {selectedEvent.programs.find(
                          (p) => p.name === selectedProgram
                        )?.absentees.length || 0}
                        )
                      </h6>
                      <ul>
                        {selectedEvent.programs
                          .find((p) => p.name === selectedProgram)
                          ?.absentees.map((absentee, i) => (
                            <li key={i}>{absentee}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => handleDownloadReport(selectedEvent)}
                className="btn download-btn"
              >
                <FaDownload /> Download Full Report
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="btn close-btn"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Reports;
