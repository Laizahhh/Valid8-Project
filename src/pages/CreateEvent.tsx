import { useState, useEffect } from "react";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaTimes,
} from "react-icons/fa";
import "../css/CreateEvent.css";

interface CreateEventProps {
  role: string;
}

interface SSGOfficer {
  id: number;
  name: string;
}

interface Program {
  id: number;
  name: string;
}

interface Event {
  id?: number;
  name: string;
  date: string;
  location: string;
  status?: string;
  programs?: Program[];
  ssgOfficers?: SSGOfficer[];
}

export const CreateEvent: React.FC<CreateEventProps> = ({ role }) => {
  // Form state
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [selectedSSGOfficers, setSelectedSSGOfficers] = useState<SSGOfficer[]>(
    []
  );
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [ssgDropdownOpen, setSSGDropdownOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);

  // Data from API
  const [ssgOfficers, setSSGOfficers] = useState<SSGOfficer[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const officersResponse = await fetch(`${BASE_URL}/ssg-officers`);
        if (!officersResponse.ok)
          throw new Error(
            `Failed to fetch SSG officers: ${officersResponse.status}`
          );
        const officersData = await officersResponse.json();

        const programsResponse = await fetch(`${BASE_URL}/programs`);
        if (!programsResponse.ok)
          throw new Error(
            `Failed to fetch programs: ${programsResponse.status}`
          );
        const programsData = await programsResponse.json();

        setSSGOfficers(officersData);
        setPrograms(programsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          `Failed to load data: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setSelectedSSGOfficers([]);
    setSelectedPrograms([]);
    setSSGDropdownOpen(false);
    setProgramDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData: Event = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      status: "Upcoming",
      programs: selectedPrograms,
      ssgOfficers: selectedSSGOfficers,
    };

    try {
      const response = await fetch(`${BASE_URL}/upcomingEvents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok)
        throw new Error(`Failed to create event: ${response.status}`);

      const result = await response.json();
      alert(`Event created successfully! Event: ${result.name}`);
      resetForm();
    } catch (err) {
      console.error("Error creating event:", err);
      alert(
        `Failed to create event: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const toggleOfficerSelection = (officer: SSGOfficer) => {
    setSelectedSSGOfficers(
      selectedSSGOfficers.some((selected) => selected.id === officer.id)
        ? selectedSSGOfficers.filter((selected) => selected.id !== officer.id)
        : [...selectedSSGOfficers, officer]
    );
  };

  const toggleProgramSelection = (program: Program) => {
    setSelectedPrograms(
      selectedPrograms.some((selected) => selected.id === program.id)
        ? selectedPrograms.filter((selected) => selected.id !== program.id)
        : [...selectedPrograms, program]
    );
  };

  const removeOfficer = (officerId: number) => {
    setSelectedSSGOfficers(
      selectedSSGOfficers.filter((officer) => officer.id !== officerId)
    );
  };

  const removeProgram = (programId: number) => {
    setSelectedPrograms(
      selectedPrograms.filter((program) => program.id !== programId)
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="navbar-container">
          {role === "student-ssg-eventorganizer" ? (
            <NavbarStudentSSGEventOrganizer />
          ) : (
            <NavbarEventOrganizer />
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            Loading event data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="navbar-container">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
      </div>

      <div
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1.5rem",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}. Some features may be limited.
          </div>
        )}

        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.5rem",
            color: "#343a40",
          }}
        >
          Create New Event
        </h2>
        <p
          style={{
            color: "#6c757d",
            marginBottom: "2rem",
          }}
        >
          Fill in the details below to create a new event
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              placeholder="Enter Event Name"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                fontSize: "1rem",
                transition: "border-color 0.15s ease-in-out",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCalendarAlt style={{ marginRight: "0.5rem" }} />
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
              Location
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
                placeholder="Enter Location"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  paddingRight: "2.5rem",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem", position: "relative" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaUsers style={{ marginRight: "0.5rem" }} />
              Assign SSG Officers
            </label>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => setSSGDropdownOpen(!ssgDropdownOpen)}
              >
                {selectedSSGOfficers.length > 0 ? (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {selectedSSGOfficers.map((officer) => (
                      <span
                        key={officer.id}
                        style={{
                          backgroundColor: "#e9ecef",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.875rem",
                        }}
                      >
                        {officer.name}
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0 0.25rem",
                            marginLeft: "0.25rem",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOfficer(officer.id);
                          }}
                        >
                          <FaTimes size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Select Officers</span>
                )}
                <span>{ssgDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {ssgDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    marginTop: "0.25rem",
                    zIndex: 1000,
                    maxHeight: "300px",
                    overflowY: "auto",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {ssgOfficers.map((officer) => (
                    <label
                      key={officer.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem 1rem",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSSGOfficers.some(
                          (selected) => selected.id === officer.id
                        )}
                        onChange={() => toggleOfficerSelection(officer)}
                        style={{
                          marginRight: "0.75rem",
                          width: "1.25rem",
                          height: "1.25rem",
                          cursor: "pointer",
                        }}
                      />
                      <span>{officer.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "2rem", position: "relative" }}>
            <label
              style={{
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaGraduationCap style={{ marginRight: "0.5rem" }} />
              Select Programs
            </label>
            <div style={{ position: "relative" }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => setProgramDropdownOpen(!programDropdownOpen)}
              >
                {selectedPrograms.length > 0 ? (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {selectedPrograms.map((program) => (
                      <span
                        key={program.id}
                        style={{
                          backgroundColor: "#e9ecef",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "0.875rem",
                        }}
                      >
                        {program.name}
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0 0.25rem",
                            marginLeft: "0.25rem",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProgram(program.id);
                          }}
                        >
                          <FaTimes size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Select Programs</span>
                )}
                <span>{programDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {programDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    marginTop: "0.25rem",
                    zIndex: 1000,
                    maxHeight: "300px",
                    overflowY: "auto",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {programs.map((program) => (
                    <label
                      key={program.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.75rem 1rem",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPrograms.some(
                          (selected) => selected.id === program.id
                        )}
                        onChange={() => toggleProgramSelection(program)}
                        style={{
                          marginRight: "0.75rem",
                          width: "1.25rem",
                          height: "1.25rem",
                          cursor: "pointer",
                        }}
                      />
                      <span>{program.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <button
              type="button"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0d6efd",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
