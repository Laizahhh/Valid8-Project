import { useState, useEffect } from "react";
import {
  AiFillEdit,
  AiFillCheckCircle,
  AiOutlineSync,
  AiOutlineCalendar,
  AiFillDelete,
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
  id: string; // Added id field for API operations
  name: string;
  date: string;
  location: string;
  status: string;
}

export const ManageEvent: React.FC<ManageEventProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);
  const [eventToComplete, setEventToComplete] = useState<string | null>(null);

  const [isUpcomingModalOpen, setUpcomingModalOpen] = useState(false);
  const [eventToUpcoming, setEventToUpcoming] = useState<string | null>(null);

  const [isActiveModalOpen, setActiveModalOpen] = useState(false);
  const [eventToActive, setEventToActive] = useState<string | null>(null);

  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(
    null
  );

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/upcomingEvents`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = (index: number) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent({ ...event });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingEvent(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
    }
  };

  const saveEditedEvent = async () => {
    if (!editingEvent) return;

    try {
      const response = await fetch(
        `${BASE_URL}/upcomingEvents/${editingEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      closeEditModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
    }
  };
  const updateEventStatus = async (eventId: string, newStatus: string) => {
    try {
      // 1. Update the event status directly in the upcomingEvents array
      const response = await fetch(`${BASE_URL}/upcomingEvents/${eventId}`, {
        method: "PATCH", // Using PATCH to update only the status field
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Update local state
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, status: newStatus } : event
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setDropdownOpenIndex(null);
      setActiveModalOpen(false);
      setUpcomingModalOpen(false);
      setCompleteModalOpen(false);
    }
  };
  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      const response = await fetch(
        `${BASE_URL}/upcomingEvents/${eventToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((event) => event.id !== eventToDelete));
      setDeleteModalOpen(false);
      setEventToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    }
  };

  const getStatusBadge = (status: string) => {
    let badgeClass = "";
    switch (status) {
      case "Upcoming":
        badgeClass = "badge bg-primary";
        break;
      case "Active":
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

  if (isLoading) {
    return (
      <div className="manage-events-page">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
        <div className="manage-events-container">
          <div className="loading-spinner">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-events-page">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
        <div className="manage-events-container">
          <div className="error-message">Error: {error}</div>
        </div>
      </div>
    );
  }

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
                  <tr key={event.id}>
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
                          onClick={() => openEditModal(event)}
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
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            setEventToDelete(event.id);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <AiFillDelete /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="no-results">
                      {events.length === 0
                        ? "No events found."
                        : "No matching events found. Try a different search term."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dropdown menus rendered outside the table */}
          {filteredEvents.map((event, index) => (
            <div
              key={`dropdown-${event.id}`}
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
                      setEventToUpcoming(event.id);
                      setUpcomingModalOpen(true);
                    }}
                  >
                    <AiOutlineCalendar /> Upcoming
                  </button>
                  <button
                    className={`dropdown-item ${
                      event.status === "Active" ? "active" : ""
                    }`}
                    onClick={() => {
                      setEventToActive(event.id);
                      setActiveModalOpen(true);
                    }}
                  >
                    <AiOutlineSync /> Active
                  </button>
                  <button
                    className={`dropdown-item ${
                      event.status === "Completed" ? "active" : ""
                    }`}
                    onClick={() => {
                      setEventToComplete(event.id);
                      setCompleteModalOpen(true);
                    }}
                  >
                    <AiFillCheckCircle /> Complete
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
                if (eventToUpcoming) {
                  updateEventStatus(eventToUpcoming, "Upcoming");
                }
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={isActiveModalOpen}
          onRequestClose={() => setActiveModalOpen(false)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Status Change</h3>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to mark this event as active?</p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setActiveModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-warning"
              onClick={() => {
                if (eventToActive) {
                  updateEventStatus(eventToActive, "Active");
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
                if (eventToComplete) {
                  updateEventStatus(eventToComplete, "Completed");
                }
              }}
            >
              Confirm
            </button>
          </div>
        </Modal>

        {/* Delete Event Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Deletion</h3>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDeleteEvent}>
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageEvent;
