import { useState } from "react";
import {
  AiFillEdit,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSync,
  AiOutlineCalendar,
  AiOutlineDown,
} from "react-icons/ai";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import search_logo from "../assets/images/search_logo.png";
import Modal from "react-modal";
import "../css/ManageEvent.css";

interface ManageEventProps {
  role: string;
}

interface Event {
  name: string;
  date: string;
  location: string;
  status: string;
}

export const ManageEvent: React.FC<ManageEventProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      name: "Sports Fest",
      date: "2025-04-10",
      location: "University Gymnasium",
      status: "Upcoming",
    },
    {
      name: "Cultural Night",
      date: "2025-05-15",
      location: "Main Auditorium",
      status: "Upcoming",
    },
    {
      name: "Graduation Ceremony",
      date: "2025-06-20",
      location: "Grand Ballroom",
      status: "Upcoming",
    },
  ]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelIndex, setCancelIndex] = useState<number | null>(null);

  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
  const [completeIndex, setCompleteIndex] = useState<number | null>(null);

  const [isUpcomingModalOpen, setUpcomingModalOpen] = useState(false);
  const [upcomingIndex, setUpcomingIndex] = useState<number | null>(null);

  const [isOngoingModalOpen, setOngoingModalOpen] = useState(false);
  const [ongoingIndex, setOngoingIndex] = useState<number | null>(null);

  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(
    null
  );

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = (index: number) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  const openEditModal = (event: Event, index: number) => {
    setEditingEvent({ ...event });
    setEditIndex(index);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingEvent(null);
    setEditIndex(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
    }
  };

  const saveEditedEvent = () => {
    if (editingEvent !== null && editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = editingEvent;
      setEvents(updatedEvents);
      closeEditModal();
    }
  };

  const updateEventStatus = (index: number, newStatus: string) => {
    const updatedEvents = [...events];
    updatedEvents[index].status = newStatus;
    setEvents(updatedEvents);
    setDropdownOpenIndex(null);
  };

  const getStatusBadge = (status: string) => {
    let badgeClass = "";
    switch (status) {
      case "Upcoming":
        badgeClass = "badge bg-primary";
        break;
      case "Ongoing":
        badgeClass = "badge bg-warning text-dark";
        break;
      case "Completed":
        badgeClass = "badge bg-success";
        break;
      case "Canceled":
        badgeClass = "badge bg-danger";
        break;
      default:
        badgeClass = "badge bg-secondary";
    }
    return <span className={badgeClass}>{status}</span>;
  };

  Modal.setAppElement("#root");

  return (
    <div className="manage-events-page">
      {role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarEventOrganizer />
      )}

      <div className="manage-events-container">
        <header className="manage-events-header">
          <h2>Event Management</h2>
          <p className="subtitle">
            Manage and update university events and their status
          </p>
        </header>

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

        <div className="table-responsive-container">
          <div className="table-responsive">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
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
                    <td data-label="Status">{getStatusBadge(event.status)}</td>
                    <td data-label="Actions" className="actions-cell">
                      <div className="button-group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => openEditModal(event, index)}
                        >
                          <AiFillEdit /> Edit
                        </button>
                        <div className="status-dropdown-container">
                          <button
                            className="btn btn-outline-secondary btn-sm dropdown-toggle"
                            onClick={() => toggleDropdown(index)}
                          >
                            Status
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-results">
                      No matching events found. Try a different search term.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dropdown menus rendered outside the table */}
          {filteredEvents.map((event, index) => (
            <div
              key={`dropdown-${index}`}
              className={`status-dropdown-menu-container ${
                dropdownOpenIndex === index ? "visible" : ""
              }`}
              style={{
                position: "absolute",
                top:
                  document
                    .querySelector(
                      `tr:nth-child(${index + 1}) .status-dropdown-container`
                    )
                    ?.getBoundingClientRect().bottom +
                  window.scrollY +
                  "px",
                left:
                  document
                    .querySelector(
                      `tr:nth-child(${index + 1}) .status-dropdown-container`
                    )
                    ?.getBoundingClientRect().left + "px",
              }}
            >
              {dropdownOpenIndex === index && (
                <div className="status-dropdown-menu">
                  <button
                    className={`dropdown-item ${
                      event.status === "Upcoming" ? "active" : ""
                    }`}
                    onClick={() => {
                      setUpcomingIndex(index);
                      setUpcomingModalOpen(true);
                    }}
                  >
                    <AiOutlineCalendar /> Upcoming
                  </button>
                  <button
                    className={`dropdown-item ${
                      event.status === "Ongoing" ? "active" : ""
                    }`}
                    onClick={() => {
                      setOngoingIndex(index);
                      setOngoingModalOpen(true);
                    }}
                  >
                    <AiOutlineSync /> Ongoing
                  </button>
                  <button
                    className={`dropdown-item ${
                      event.status === "Completed" ? "active" : ""
                    }`}
                    onClick={() => {
                      setCompleteIndex(index);
                      setCompleteModalOpen(true);
                    }}
                  >
                    <AiFillCheckCircle /> Complete
                  </button>
                  <button
                    className={`dropdown-item ${
                      event.status === "Canceled" ? "active" : ""
                    }`}
                    onClick={() => {
                      setCancelIndex(index);
                      setCancelModalOpen(true);
                    }}
                  >
                    <AiFillCloseCircle /> Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="edit-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Edit Event Details</h3>
            <button onClick={closeEditModal} className="close-button">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="event-name">Event Name</label>
              <input
                type="text"
                id="event-name"
                name="name"
                className="form-control"
                value={editingEvent?.name || ""}
                onChange={handleEditChange}
                placeholder="Enter event name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-date">Date</label>
              <input
                type="date"
                id="event-date"
                name="date"
                className="form-control"
                value={editingEvent?.date || ""}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="event-location">Location</label>
              <input
                type="text"
                id="event-location"
                name="location"
                className="form-control"
                value={editingEvent?.location || ""}
                onChange={handleEditChange}
                placeholder="Enter event location"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeEditModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={saveEditedEvent}>
              Save Changes
            </button>
          </div>
        </Modal>

        {/* Status Change Modals */}
        <Modal
          isOpen={isUpcomingModalOpen}
          onRequestClose={() => setUpcomingModalOpen(false)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Status Change</h3>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to mark this event as upcoming?</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setUpcomingModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (upcomingIndex !== null) {
                  updateEventStatus(upcomingIndex, "Upcoming");
                  setUpcomingModalOpen(false);
                }
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isOngoingModalOpen}
          onRequestClose={() => setOngoingModalOpen(false)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Status Change</h3>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to mark this event as ongoing?</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setOngoingModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-warning"
              onClick={() => {
                if (ongoingIndex !== null) {
                  updateEventStatus(ongoingIndex, "Ongoing");
                  setOngoingModalOpen(false);
                }
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isCompleteModalOpen}
          onRequestClose={() => setCompleteModalOpen(false)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Status Change</h3>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to mark this event as completed?</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCompleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                if (completeIndex !== null) {
                  updateEventStatus(completeIndex, "Completed");
                  setCompleteModalOpen(false);
                }
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isCancelModalOpen}
          onRequestClose={() => setCancelModalOpen(false)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Status Change</h3>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to cancel this event?</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCancelModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (cancelIndex !== null) {
                  updateEventStatus(cancelIndex, "Canceled");
                  setCancelModalOpen(false);
                }
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageEvent;
