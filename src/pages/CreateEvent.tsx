import { useState } from "react";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";

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
  const programs = [
    "BS Computer Engineering",
    "BS Civil Engineering",
    "BS Electronics Engineering",
    "BS Electrical Engineering",
  ];

  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setSelectedSSGOfficers([]);
    setSelectedPrograms([]);
    setSSGDropdownOpen(false);
    setProgramDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      eventName,
      eventDate,
      eventLocation,
      selectedSSGOfficers,
      selectedPrograms,
    });
    alert("Event created successfully!");
    resetForm();
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
      {/* Navbar */}
      <div className="navbar-container">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
      </div>

      <div className="create-event-container">
        <h2 className="form-title">Create New Event</h2>
        <p className="form-subtitle">
          Fill in the details below to create a new event
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">
              <FaCalendarAlt className="input-icon" />
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              placeholder="Enter Event Name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <FaCalendarAlt className="input-icon" />
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <FaMapMarkerAlt className="input-icon" />
              Location
            </label>
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
              placeholder="Enter Location"
              className="form-input"
            />
          </div>

          {/* Assign SSG Officers Dropdown */}
          <div className="form-group dropdown-wrapper">
            <label className="input-label">
              <FaUsers className="input-icon" />
              Assign SSG Officers
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setSSGDropdownOpen(!ssgDropdownOpen)}
              >
                {selectedSSGOfficers.length > 0 ? (
                  <div className="selected-items">
                    {selectedSSGOfficers.map((officer) => (
                      <span key={officer} className="selected-badge">
                        {officer}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Select Officers</span>
                )}
                <span className="dropdown-icon">
                  {ssgDropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              {ssgDropdownOpen && (
                <div className="dropdown-content">
                  {ssgOfficers.map((officer) => (
                    <label key={officer} className="dropdown-item radio-style">
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
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      <span className="dropdown-text">{officer}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Select Programs Dropdown */}
          <div className="form-group dropdown-wrapper">
            <label className="input-label">
              <FaGraduationCap className="input-icon" />
              Select Programs
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setProgramDropdownOpen(!programDropdownOpen)}
              >
                {selectedPrograms.length > 0 ? (
                  <div className="selected-items">
                    {selectedPrograms.map((program) => (
                      <span key={program} className="selected-badge">
                        {program}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Select Programs</span>
                )}
                <span className="dropdown-icon">
                  {programDropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              {programDropdownOpen && (
                <div className="dropdown-content">
                  {programs.map((program) => (
                    <label key={program} className="dropdown-item radio-style">
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
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      <span className="dropdown-text">{program}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-reset" onClick={resetForm}>
              Reset
            </button>
            <button type="submit" className="btn btn-submit">
              Create Event
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .create-event-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        .navbar-container {
          width: 100%;
        }

        .create-event-container {
          background: #ffffff;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 600px;
          margin: 2rem auto;
        }

        .form-title {
          color: #343a40;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .form-subtitle {
          color: #6c757d;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .input-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #495057;
        }

        .input-icon {
          margin-right: 0.5rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          width: 100%;
          font-size: 0.9rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          background-color: #ffffff;
          cursor: pointer;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #495057;
          transition: border-color 0.3s ease;
        }

        .dropdown-btn:hover {
          border-color: #adb5bd;
        }

        .dropdown-icon {
          font-size: 0.8rem;
          color: #6c757d;
        }

        .dropdown-content {
          position: absolute;
          width: 100%;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
          z-index: 100;
          border: 1px solid #e9ecef;
        }

        /* Radio-style checkbox */
        .dropdown-item.radio-style {
          position: relative;
          padding-left: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          min-height: 24px;
        }

        .radio-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .radio-custom {
          position: absolute;
          left: 10px;
          height: 16px;
          width: 16px;
          background-color: #fff;
          border: 2px solid #ddd;
          border-radius: 50%;
        }

        .radio-input:checked ~ .radio-custom {
          background-color: #162f65;
          border-color: #162f65;
        }

        .radio-custom:after {
          content: "";
          position: absolute;
          display: none;
        }

        .radio-input:checked ~ .radio-custom:after {
          display: block;
        }

        .radio-custom:after {
          left: 4px;
          top: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }

        .dropdown-text {
          font-size: 0.9rem;
          color: #495057;
          margin-left: 5px;
        }

        /* Selected items display */
        .selected-items {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .selected-badge {
          background-color: #162f65;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 12px;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          gap: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          flex: 1;
          text-align: center;
        }

        .btn-reset {
          background-color: #6c757d;
          color: white;
        }

        .btn-reset:hover {
          background-color: #5a6268;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-submit {
          background-color: #28a745;
          color: white;
        }

        .btn-submit:hover {
          background-color: #218838;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .create-event-container {
            margin: 1rem;
            padding: 1.5rem;
          }

          .button-group {
            flex-direction: column;
          }
        }

        @media (min-width: 992px) {
          .create-event-wrapper {
            margin-left: 5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateEvent;
