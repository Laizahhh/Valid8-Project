import { useState } from "react";
import {
  AiFillEdit,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import search_logo from "../assets/images/search_logo.png";
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
      location: "Gym",
      status: "Upcoming",
    },
    {
      name: "Cultural Night",
      date: "2025-05-15",
      location: "Auditorium",
      status: "Upcoming",
    },
    {
      name: "Graduation",
      date: "2025-06-20",
      location: "Main Hall",
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

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  };

  return (
    <div>
      {role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarEventOrganizer />
      )}

      <div className="manage-events container small-container">
        <h3>Manage Event</h3>

        <div className="search-manage-event">
          <input
            type="search"
            placeholder="Search events..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search_logo} alt="search" className="search-icon" />
        </div>

        <div className="upcoming-events-table">
          <table>
            <thead>
              <tr>
                <th className="manage-event">Event</th>
                <th className="date">Date</th>
                <th className="location">Location</th>
                <th className="status">Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.status}</td>
                  <td className="button-group">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openEditModal(event, index)}
                    >
                      <AiFillEdit /> Edit
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      disabled={event.status !== "Upcoming"}
                      onClick={() => {
                        setCompleteIndex(index);
                        setCompleteModalOpen(true);
                      }}
                    >
                      <AiFillCheckCircle /> Completed
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      disabled={event.status !== "Upcoming"}
                      onClick={() => {
                        setCancelIndex(index);
                        setCancelModalOpen(true);
                      }}
                    >
                      <AiFillCloseCircle /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={5}>No matching events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Edit Event</h3>
            <input
              type="text"
              name="name"
              value={editingEvent?.name || ""}
              onChange={handleEditChange}
              placeholder="Event Name"
            />
            <input
              type="date"
              name="date"
              value={editingEvent?.date || ""}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="location"
              value={editingEvent?.location || ""}
              onChange={handleEditChange}
              placeholder="Event Location"
            />
            <div
              className="modal-buttons"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <button className="btn btn-secondary" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveEditedEvent}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && cancelIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-container">
            <p>Are you sure you want to cancel this event?</p>
            <div
              className="modal-buttons"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <button
                className="btn btn-danger"
                onClick={() => {
                  updateEventStatus(cancelIndex, "Canceled");
                  setCancelModalOpen(false);
                  setCancelIndex(null);
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setCancelModalOpen(false);
                  setCancelIndex(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Confirmation Modal */}
      {isCompleteModalOpen && completeIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-container">
            <p>Are you sure this event is completed?</p>
            <div
              className="modal-buttons"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <button
                className="btn btn-success"
                onClick={() => {
                  updateEventStatus(completeIndex, "Completed");
                  setCompleteModalOpen(false);
                  setCompleteIndex(null);
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setCompleteModalOpen(false);
                  setCompleteIndex(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvent;
