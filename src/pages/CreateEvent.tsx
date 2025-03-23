import { useState } from "react";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import "../css/CreateEvent.css";

interface CreateEventProps {
  role: string;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ role }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [selectedSSGOfficers, setSelectedSSGOfficers] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [ssgDropdownOpen, setSSGDropdownOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);

  const ssgOfficers = ["Officer 1", "Officer 2", "Officer 3"];
  const programs = ["Program A", "Program B", "Program C"];

  // Function to reset all form fields
  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setSelectedSSGOfficers([]);
    setSelectedPrograms([]);
    setSSGDropdownOpen(false);
    setProgramDropdownOpen(false);
  };

  const toggleSelection = (
    item: string,
    selectedList: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(
      selectedList.includes(item)
        ? selectedList.filter((selected) => selected !== item)
        : [...selectedList, item]
    );
  };

  return (
    <div className="create-event-wrapper">
      {/* Navbar with full width */}
      <div className="navbar-container">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
      </div>

      <div className="create-event-container">
        <h3>Create Event</h3>

        <form>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              placeholder="Enter Event Name"
            />
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
              placeholder="Enter Location"
            />
          </div>

          {/* Assign SSG Officers Dropdown */}
          <div className="form-group dropdown-wrapper">
            <label>Assign SSG Officers</label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setSSGDropdownOpen(!ssgDropdownOpen)}
              >
                <span>Select Officers</span>
                <span className="icon">{ssgDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {ssgDropdownOpen && (
                <div className="dropdown-content">
                  {ssgOfficers.map((officer) => (
                    <label key={officer} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedSSGOfficers.includes(officer)}
                        onChange={() =>
                          toggleSelection(
                            officer,
                            selectedSSGOfficers,
                            setSelectedSSGOfficers
                          )
                        }
                      />
                      {officer}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Select Programs Dropdown */}
          <div className="form-group dropdown-wrapper">
            <label>Select Programs</label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setProgramDropdownOpen(!programDropdownOpen)}
              >
                <span>Select Programs</span>
                <span className="icon">{programDropdownOpen ? "▲" : "▼"}</span>
              </button>
              {programDropdownOpen && (
                <div className="dropdown-content">
                  {programs.map((program) => (
                    <label key={program} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedPrograms.includes(program)}
                        onChange={() =>
                          toggleSelection(
                            program,
                            selectedPrograms,
                            setSelectedPrograms
                          )
                        }
                      />
                      {program}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="button-group"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
              style={{ alignSelf: "flex-start" }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: "flex-end" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
