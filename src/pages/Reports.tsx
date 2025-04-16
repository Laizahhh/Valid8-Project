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

  // Enhanced CSV download function
  const handleDownloadCSVReport = (event: Event) => {
    // Generate CSV content
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add header
    csvContent += `${event.name} - Attendance Report\r\n`;
    csvContent += `Date: ${event.date}\r\n`;
    csvContent += `Location: ${event.location}\r\n\r\n`;

    // Overall summary
    const totalAttendees = event.programs.reduce(
      (sum, program) => sum + program.attendees.length,
      0
    );
    const totalAbsentees = event.programs.reduce(
      (sum, program) => sum + program.absentees.length,
      0
    );
    const totalParticipants = totalAttendees + totalAbsentees;
    const attendanceRate = Math.round(
      (totalAttendees / totalParticipants) * 100
    );

    csvContent += `Overall Summary:\r\n`;
    csvContent += `Total Participants: ${totalParticipants}\r\n`;
    csvContent += `Total Attendees: ${totalAttendees}\r\n`;
    csvContent += `Total Absentees: ${totalAbsentees}\r\n`;
    csvContent += `Overall Attendance Rate: ${attendanceRate}%\r\n\r\n`;

    // Program details
    csvContent += `Detailed Program Breakdown:\r\n\r\n`;

    event.programs.forEach((program) => {
      csvContent += `Program: ${program.name}\r\n`;
      csvContent += `Participants: ${
        program.attendees.length + program.absentees.length
      }\r\n`;
      csvContent += `Attendees: ${program.attendees.length}\r\n`;
      csvContent += `Absentees: ${program.absentees.length}\r\n`;
      const programAttendanceRate = Math.round(
        (program.attendees.length /
          (program.attendees.length + program.absentees.length)) *
          100
      );
      csvContent += `Attendance Rate: ${programAttendanceRate}%\r\n\r\n`;

      csvContent += `Attendees,\r\n`;
      program.attendees.forEach((attendee) => {
        csvContent += `${attendee},\r\n`;
      });

      csvContent += `\r\nAbsentees,\r\n`;
      program.absentees.forEach((absentee) => {
        csvContent += `${absentee},\r\n`;
      });

      csvContent += `\r\n`;
    });

    // Create download link and trigger click
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${event.name.replace(/\s+/g, "_")}_Report.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF report using browser's print functionality
  const handleDownloadPDFReport = (event: Event) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to download the PDF report");
      return;
    }

    // Generate HTML content for the print window
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${event.name} - Attendance Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { margin-bottom: 30px; }
          h1 { color: #333; margin-bottom: 5px; }
          .event-details { color: #666; margin-bottom: 20px; }
          .summary-section { margin-bottom: 30px; }
          .summary-cards { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 30px; }
          .summary-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; width: 200px; }
          .card-title { display: block; font-size: 14px; color: #666; }
          .card-value { display: block; font-size: 24px; font-weight: bold; margin-top: 5px; }
          .total .card-value { color: #2196F3; }
          .present .card-value { color: #4CAF50; }
          .absent .card-value { color: #F44336; }
          .rate .card-value { color: #FF9800; }
          .program-section { margin-bottom: 30px; }
          h2, h3 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .attendance-lists { display: flex; gap: 30px; }
          .attendees-list, .absentees-list { flex: 1; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${event.name} - Attendance Report</h1>
          <p class="event-details">Date: ${event.date} • Location: ${
      event.location
    }</p>
        </div>
        
        <div class="summary-section">
          <h2>Overall Attendance Summary</h2>
          <div class="summary-cards">
            <div class="summary-card total">
              <span class="card-title">Total Participants</span>
              <span class="card-value">${getTotalParticipants()}</span>
            </div>
            <div class="summary-card present">
              <span class="card-title">Attendees</span>
              <span class="card-value">${getAttendees()}</span>
            </div>
            <div class="summary-card absent">
              <span class="card-title">Absentees</span>
              <span class="card-value">${getAbsentees()}</span>
            </div>
            <div class="summary-card rate">
              <span class="card-title">Attendance Rate</span>
              <span class="card-value">${getAttendanceRate()}</span>
            </div>
          </div>
        </div>
        
        <h2>Program Breakdown</h2>
    `;

    // Add program summary table
    htmlContent += `
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th>Total Participants</th>
            <th>Attendees</th>
            <th>Absentees</th>
            <th>Attendance Rate</th>
          </tr>
        </thead>
        <tbody>
    `;

    event.programs.forEach((program) => {
      const programTotal = program.attendees.length + program.absentees.length;
      const programRate = Math.round(
        (program.attendees.length / programTotal) * 100
      );

      htmlContent += `
        <tr>
          <td>${program.name}</td>
          <td>${programTotal}</td>
          <td>${program.attendees.length}</td>
          <td>${program.absentees.length}</td>
          <td>${programRate}%</td>
        </tr>
      `;
    });

    htmlContent += `
        </tbody>
      </table>
    `;

    // Add detailed attendance lists for each program
    event.programs.forEach((program) => {
      htmlContent += `
        <div class="program-section">
          <h3>${program.name}</h3>
          <div class="attendance-lists">
            <div class="attendees-list">
              <h4>Attendees (${program.attendees.length})</h4>
              <ul>
      `;

      program.attendees.forEach((attendee) => {
        htmlContent += `<li>${attendee}</li>`;
      });

      htmlContent += `
              </ul>
            </div>
            <div class="absentees-list">
              <h4>Absentees (${program.absentees.length})</h4>
              <ul>
      `;

      program.absentees.forEach((absentee) => {
        htmlContent += `<li>${absentee}</li>`;
      });

      htmlContent += `
              </ul>
            </div>
          </div>
        </div>
      `;
    });

    // Add print button and closing tags
    htmlContent += `
        <div class="no-print" style="margin-top: 40px; text-align: center;">
          <button onclick="window.print();" style="padding: 10px 20px; background-color: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Print Report</button>
          <button onclick="window.close();" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-left: 10px;">Close</button>
        </div>
      </body>
      </html>
    `;

    // Write to the new window and trigger print dialog
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };

  // Helper functions for summary data
  const getTotalParticipants = () => {
    if (!selectedEvent) return 0;

    if (selectedProgram === "All") {
      return selectedEvent.programs.reduce(
        (sum, program) =>
          sum + program.attendees.length + program.absentees.length,
        0
      );
    } else {
      const program = selectedEvent.programs.find(
        (p) => p.name === selectedProgram
      );
      if (!program) return 0;
      return program.attendees.length + program.absentees.length;
    }
  };

  const getAttendees = () => {
    if (!selectedEvent) return 0;

    if (selectedProgram === "All") {
      return selectedEvent.programs.reduce(
        (sum, program) => sum + program.attendees.length,
        0
      );
    } else {
      const program = selectedEvent.programs.find(
        (p) => p.name === selectedProgram
      );
      return program?.attendees.length || 0;
    }
  };

  const getAbsentees = () => {
    if (!selectedEvent) return 0;

    if (selectedProgram === "All") {
      return selectedEvent.programs.reduce(
        (sum, program) => sum + program.absentees.length,
        0
      );
    } else {
      const program = selectedEvent.programs.find(
        (p) => p.name === selectedProgram
      );
      return program?.absentees.length || 0;
    }
  };

  const getAttendanceRate = () => {
    const total = getTotalParticipants();
    if (total === 0) return "0%";

    const attendees = getAttendees();
    return `${Math.round((attendees / total) * 100)}%`;
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
                        onClick={() => handleDownloadCSVReport(event)}
                        aria-label="Download report"
                      >
                        <FaDownload /> {!isMobile && "CSV"}
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDownloadPDFReport(event)}
                        aria-label="Download PDF report"
                        style={{ backgroundColor: "#4285F4" }}
                      >
                        <FaDownload /> {!isMobile && "PDF"}
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
                  <span className="card-value">{getTotalParticipants()}</span>
                </div>
                <div className="summary-card present">
                  <span className="card-title">Attendees</span>
                  <span className="card-value">{getAttendees()}</span>
                </div>
                <div className="summary-card absent">
                  <span className="card-title">Absentees</span>
                  <span className="card-value">{getAbsentees()}</span>
                </div>
                <div className="summary-card rate">
                  <span className="card-title">Attendance Rate</span>
                  <span className="card-value">{getAttendanceRate()}</span>
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
                          value: getAttendees(),
                        },
                        {
                          name: "Absent",
                          value: getAbsentees(),
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

              {selectedProgram === "All" && getProgramData().length > 0 && (
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
                        <>
                          <YAxis type="category" dataKey="name" interval={0} />
                          <XAxis type="number" />
                        </>
                      ) : (
                        <>
                          <XAxis
                            type="category"
                            dataKey="name"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                          />
                          <YAxis type="number" />
                        </>
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
                  {selectedEvent.programs.find(
                    (p) => p.name === selectedProgram
                  ) && (
                    <>
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
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="download-options">
                <button
                  onClick={() => handleDownloadCSVReport(selectedEvent)}
                  className="btn download-btn"
                >
                  <FaDownload /> Download CSV Report
                </button>
                <button
                  onClick={() => handleDownloadPDFReport(selectedEvent)}
                  className="btn download-btn pdf-btn"
                >
                  <FaDownload /> Download PDF Report
                </button>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="btn close-btn"
                style={{ marginTop: "15px" }}
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
