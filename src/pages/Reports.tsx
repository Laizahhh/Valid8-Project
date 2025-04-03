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
      name: "Science Fair",
      date: "2025-04-10",
      location: "Auditorium",
      programs: [
        {
          name: "BS Civil Engineering",
          attendees: ["John Doe", "Jane Smith"],
          absentees: ["Emily Davis"],
        },
        {
          name: "BS Computer Engineering",
          attendees: ["Michael Johnson"],
          absentees: ["Alice Brown"],
        },
        {
          name: "BS Electrical Engineering",
          attendees: ["David Lee"],
          absentees: ["Sarah Connor"],
        },
        {
          name: "BS Electronics Engineering",
          attendees: ["Eve Adams"],
          absentees: ["Tom Cruise"],
        },
      ],
    },
    {
      name: "Sports Fest",
      date: "2025-05-02",
      location: "School Grounds",
      programs: [
        {
          name: "BS Civil Engineering",
          attendees: ["Michael Johnson"],
          absentees: ["John Doe"],
        },
        {
          name: "BS Computer Engineering",
          attendees: ["Alice Brown"],
          absentees: ["Jane Smith"],
        },
        {
          name: "BS Electrical Engineering",
          attendees: ["David Lee"],
          absentees: ["Emily Davis"],
        },
        {
          name: "BS Electronics Engineering",
          attendees: ["Tom Cruise"],
          absentees: ["Eve Adams"],
        },
      ],
    },
  ]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string>("All");

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
            `Program:,${program.name}\nAttendees:\n${program.attendees.join(
              "\n"
            )}\nAbsentees:\n${program.absentees.join("\n")}\n`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${event.name}_attendance_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="upcoming-events container small-container">
        <h3>Reports</h3>

        {/* Search Bar */}
        <div className="search-reports">
          <input
            type="search"
            placeholder="Search events..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search_logo} alt="search" className="search-icon" />
        </div>

        {/* Events Table */}
        <div className="upcoming-events-table">
          <table>
            <thead>
              <tr>
                <th className="eventname">Event</th>
                <th className="date">Date</th>
                <th className="location">Location</th>
                <th className="download">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleViewReport(event)}
                      style={{ marginRight: "2px" }}
                    >
                      View Report
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleDownloadReport(event)}
                    >
                      <FaDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={4}>No matching events found.</td>
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
            style={{
              content: {
                backgroundColor: "#f9f9f9",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <h4>{selectedEvent.name} - Attendance Report</h4>

            {/* Filter Dropdown */}
            <select
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

            {/* Attendance Counts and Colored Bullets */}
            <div className="attendance-summary">
              <h5>Attendance Summary</h5>
              {selectedProgram === "All" ? (
                <>
                  <p>
                    <span style={{ color: "#4CAF50" }}>●</span> Total Attendees:{" "}
                    {selectedEvent.programs.reduce(
                      (sum, program) => sum + program.attendees.length,
                      0
                    )}
                  </p>
                  <p>
                    <span style={{ color: "#F44336" }}>●</span> Total Absentees:{" "}
                    {selectedEvent.programs.reduce(
                      (sum, program) => sum + program.absentees.length,
                      0
                    )}
                  </p>

                  {/* Bullet for Most and Least Attendees */}
                  <p>
                    <span style={{ color: "#4CAF50" }}>●</span> Program with
                    Most Attendees:{" "}
                    {
                      selectedEvent.programs.reduce(
                        (prev, curr) =>
                          curr.attendees.length > prev.attendees.length
                            ? curr
                            : prev,
                        selectedEvent.programs[0]
                      ).name
                    }{" "}
                    (
                    {
                      selectedEvent.programs.reduce(
                        (prev, curr) =>
                          curr.attendees.length > prev.attendees.length
                            ? curr
                            : prev,
                        selectedEvent.programs[0]
                      ).attendees.length
                    }
                    )
                  </p>
                  <p>
                    <span style={{ color: "#F44336" }}>●</span> Program with
                    Least Attendees:{" "}
                    {
                      selectedEvent.programs.reduce(
                        (prev, curr) =>
                          curr.attendees.length < prev.attendees.length
                            ? curr
                            : prev,
                        selectedEvent.programs[0]
                      ).name
                    }{" "}
                    (
                    {
                      selectedEvent.programs.reduce(
                        (prev, curr) =>
                          curr.attendees.length < prev.attendees.length
                            ? curr
                            : prev,
                        selectedEvent.programs[0]
                      ).attendees.length
                    }
                    )
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span style={{ color: "#4CAF50" }}>●</span>{" "}
                    {selectedProgram} - Attendees:{" "}
                    {selectedEvent.programs.find(
                      (program) => program.name === selectedProgram
                    )?.attendees.length || 0}
                  </p>
                  <p>
                    <span style={{ color: "#F44336" }}>●</span>{" "}
                    {selectedProgram} - Absentees:{" "}
                    {selectedEvent.programs.find(
                      (program) => program.name === selectedProgram
                    )?.absentees.length || 0}
                  </p>
                </>
              )}
            </div>

            {/* Pie Chart - Attendance Data */}
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={250}>
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
                    outerRadius={70}
                    fill="#8884d8"
                    label
                    dataKey="value"
                  >
                    <Cell fill="#4CAF50" /> {/* Green for Present */}
                    <Cell fill="#F44336" /> {/* Red for Absent */}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="btn btn-danger"
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Reports;
