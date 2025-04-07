import { useState, useRef, useEffect } from "react";
import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import NavbarStudentSSGEventOrganizer from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";
import search_logo from "../assets/images/search_logo.png";
import "../css/Attendance.css";
import { FaRegSmileBeam, FaCheckCircle, FaUserAlt } from "react-icons/fa";
import { FiClock, FiMapPin, FiCalendar, FiUser } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface AttendanceProps {
  role: string;
}

const dummyEvents = [
  {
    name: "Sports Day",
    date: "January 15, 2025",
    location: "Sports Complex",
    description: "Annual sports competition between departments",
    image: "https://source.unsplash.com/random/600x400/?sports",
  },
  {
    name: "Cultural Night",
    date: "March 22, 2025",
    location: "Main Hall",
    description: "Showcase of diverse cultural performances",
    image: "https://source.unsplash.com/random/600x400/?culture",
  },
  {
    name: "Science Fair",
    date: "April 10, 2025",
    location: "Gymnasium",
    description: "Exhibition of student research projects",
    image: "https://source.unsplash.com/random/600x400/?science",
  },
];

interface AttendanceRecord {
  name: string;
  date: string;
  location: string;
  description: string;
  yearLevel: string;
  program: string;
  timeIn: string;
  checkpoint: string;
  timeOut: string;
  studentId: string;
  image?: string;
  status: "pending" | "time-in" | "checkpoint" | "time-out" | "completed";
}

export const Attendance: React.FC<AttendanceProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >(
    dummyEvents.map((event) => ({
      ...event,
      yearLevel: "1",
      program: "BS Computer Engineering",
      timeIn: "",
      checkpoint: "",
      timeOut: "",
      studentId: "",
      status: "pending",
    }))
  );
  const [scanning, setScanning] = useState<number | null>(null);
  const [scanType, setScanType] = useState<
    "timeIn" | "checkpoint" | "timeOut" | null
  >(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize camera when showCamera is true
  useEffect(() => {
    if (!showCamera) return;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user",
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert("Could not access the camera. Please check permissions.");
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  const captureFace = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageData);

    // Process the scan after capture
    if (scanning !== null && scanType) {
      processFaceScan(scanning, scanType, imageData);
    }
  };

  const processFaceScan = (
    index: number,
    type: "timeIn" | "checkpoint" | "timeOut",
    faceImage: string
  ) => {
    const now = new Date();
    const timeString = now.toTimeString().substring(0, 5);

    setAttendanceRecords((prev) =>
      prev.map((record, i) => {
        if (i === index) {
          const updatedRecord = {
            ...record,
            [type]: timeString,
            status: getNextStatus(record.status, type),
          };

          if (type === "timeOut") {
            updatedRecord.status = "completed";
          }

          return updatedRecord;
        }
        return record;
      })
    );

    // Close camera after processing
    setShowCamera(false);
    setScanning(null);
    setScanType(null);
    setCapturedImage(null);
  };

  const filteredEvents = attendanceRecords.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = <K extends keyof AttendanceRecord>(
    index: number,
    field: K,
    value: AttendanceRecord[K]
  ) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record, i) =>
        i === index ? { ...record, [field]: value } : record
      )
    );
  };

  const startFaceScan = (
    index: number,
    type: "timeIn" | "checkpoint" | "timeOut"
  ) => {
    setScanning(index);
    setScanType(type);
    setShowCamera(true);
  };

  const getNextStatus = (
    currentStatus: AttendanceRecord["status"],
    type: "timeIn" | "checkpoint" | "timeOut"
  ) => {
    if (type === "timeIn") return "time-in";
    if (type === "checkpoint") return "checkpoint";
    if (type === "timeOut") return "time-out";
    return currentStatus;
  };

  const handleManualSubmit = (index: number) => {
    const record = attendanceRecords[index];

    if (!record.studentId) {
      alert("Please enter Student ID");
      return;
    }

    let type: "timeIn" | "checkpoint" | "timeOut" = "timeIn";
    if (record.status === "time-in") type = "checkpoint";
    if (record.status === "checkpoint") type = "timeOut";

    const now = new Date();
    const timeString = now.toTimeString().substring(0, 5);

    setAttendanceRecords((prev) =>
      prev.map((r, i) => {
        if (i === index) {
          const updatedRecord = {
            ...r,
            [type]: timeString,
            status: getNextStatus(r.status, type),
          };

          if (type === "timeOut") {
            updatedRecord.status = "completed";
          }

          return updatedRecord;
        }
        return r;
      })
    );
  };

  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "pending":
        return <span className="status-badge pending">Not Started</span>;
      case "time-in":
        return <span className="status-badge time-in">Time In Recorded</span>;
      case "checkpoint":
        return (
          <span className="status-badge checkpoint">Checkpoint Recorded</span>
        );
      case "time-out":
        return <span className="status-badge time-out">Time Out Recorded</span>;
      case "completed":
        return <span className="status-badge completed">Completed</span>;
      default:
        return <span className="status-badge pending">Not Started</span>;
    }
  };

  return (
    <div className="attendance-page">
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-modal-content">
            <h3>Face Scanning</h3>
            <p>Please position your face within the frame</p>

            <div className="camera-container">
              <video ref={videoRef} width="640" height="480" autoPlay />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                style={{ display: "none" }}
              />
            </div>

            <div className="camera-controls">
              <button onClick={captureFace}>Capture</button>
              <button
                onClick={() => {
                  setShowCamera(false);
                  setScanning(null);
                  setScanType(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="attendance-container">
        <div className="attendance-header">
          <div className="header-content">
            <h2 className="attendance-title">Attendance Monitoring System</h2>
            <p className="attendance-subtitle">
              Official record keeping for university events and activities
            </p>
          </div>

          <div className="attendance-search-container">
            <div className="attendance-search-box">
              <img
                src={search_logo}
                alt="search"
                className="attendance-search-icon"
              />
              <input
                type="search"
                placeholder="Search events or descriptions..."
                className="attendance-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="attendance-content">
          {filteredEvents.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <p>No matching events found</p>
                <small>Please try a different search term</small>
              </div>
            </div>
          ) : (
            <div className="attendance-cards">
              {filteredEvents.map((event, index) => (
                <div key={index} className="attendance-card">
                  <div
                    className="card-header-image"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    <div className="header-overlay">
                      <div className="event-badge">
                        {getStatusBadge(event.status)}
                      </div>
                      <h3>{event.name}</h3>
                      <div className="event-details">
                        <span>
                          <FiCalendar className="detail-icon" /> {event.date}
                        </span>
                        <span>
                          <FiMapPin className="detail-icon" /> {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <p className="event-description">{event.description}</p>

                    <div className="student-info-section">
                      <div className="info-icon">
                        <FiUser size={24} />
                      </div>
                      <div className="info-content">
                        <h4>Student Information</h4>
                        <div className="form-section">
                          <div className="form-group">
                            <label>Year Level</label>
                            <select
                              value={event.yearLevel}
                              onChange={(e) =>
                                handleChange(index, "yearLevel", e.target.value)
                              }
                            >
                              {[1, 2, 3, 4, 5].map((level) => (
                                <option key={level} value={level}>
                                  Year {level}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Program</label>
                            <select
                              value={event.program}
                              onChange={(e) =>
                                handleChange(index, "program", e.target.value)
                              }
                            >
                              {[
                                "BS Computer Engineering",
                                "BS Electrical Engineering",
                                "BS Electronics Engineering",
                                "BS Civil Engineering",
                              ].map((program) => (
                                <option key={program} value={program}>
                                  {program}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Student ID</label>
                            <input
                              type="text"
                              placeholder="Enter student ID"
                              value={event.studentId}
                              onChange={(e) =>
                                handleChange(index, "studentId", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="time-records-section">
                      <div className="time-record">
                        <h4>Time In</h4>
                        <div className="time-input-group">
                          <button
                            className={`btn face-scan-btn ${
                              scanning === index && scanType === "timeIn"
                                ? "scanning"
                                : ""
                            } ${event.timeIn ? "success" : ""}`}
                            onClick={() => startFaceScan(index, "timeIn")}
                            disabled={!!event.timeIn || scanning !== null}
                          >
                            <FaRegSmileBeam className="face-scan-icon" />
                            {event.timeIn
                              ? "Recorded"
                              : scanning === index && scanType === "timeIn"
                              ? "Scanning..."
                              : "Face Scan"}
                          </button>
                          <div className="time-display">
                            {event.timeIn ? (
                              <span className="recorded">
                                <FiClock /> {event.timeIn}
                              </span>
                            ) : (
                              <span className="pending">Not recorded</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="time-record">
                        <h4>Checkpoint</h4>
                        <div className="time-input-group">
                          <button
                            className={`btn face-scan-btn ${
                              scanning === index && scanType === "checkpoint"
                                ? "scanning"
                                : ""
                            } ${event.checkpoint ? "success" : ""}`}
                            onClick={() => startFaceScan(index, "checkpoint")}
                            disabled={
                              !event.timeIn ||
                              !!event.checkpoint ||
                              scanning !== null
                            }
                          >
                            <FaRegSmileBeam className="face-scan-icon" />
                            {event.checkpoint
                              ? "Recorded"
                              : scanning === index && scanType === "checkpoint"
                              ? "Scanning..."
                              : "Face Scan"}
                          </button>
                          <div className="time-display">
                            {event.checkpoint ? (
                              <span className="recorded">
                                <FiClock /> {event.checkpoint}
                              </span>
                            ) : (
                              <span className="pending">
                                {event.timeIn
                                  ? "Not recorded"
                                  : "Complete Time In first"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="time-record">
                        <h4>Time Out</h4>
                        <div className="time-input-group">
                          <button
                            className={`btn face-scan-btn ${
                              scanning === index && scanType === "timeOut"
                                ? "scanning"
                                : ""
                            } ${event.timeOut ? "success" : ""}`}
                            onClick={() => startFaceScan(index, "timeOut")}
                            disabled={
                              !event.checkpoint ||
                              !!event.timeOut ||
                              scanning !== null
                            }
                          >
                            <FaRegSmileBeam className="face-scan-icon" />
                            {event.timeOut
                              ? "Recorded"
                              : scanning === index && scanType === "timeOut"
                              ? "Scanning..."
                              : "Face Scan"}
                          </button>
                          <div className="time-display">
                            {event.timeOut ? (
                              <span className="recorded">
                                <FiClock /> {event.timeOut}
                              </span>
                            ) : (
                              <span className="pending">
                                {event.checkpoint
                                  ? "Not recorded"
                                  : "Complete Checkpoint first"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="submit-section">
                      <button
                        className="submit-btn"
                        onClick={() => handleManualSubmit(index)}
                        disabled={
                          event.status === "completed" ||
                          scanning !== null ||
                          (!event.studentId &&
                            !event.timeIn &&
                            !event.checkpoint &&
                            !event.timeOut)
                        }
                      >
                        {event.status === "completed" ? (
                          <>
                            <IoMdCheckmarkCircleOutline /> Attendance Complete
                          </>
                        ) : (
                          "Submit Attendance"
                        )}
                      </button>
                      <p className="alternative-text">
                        {event.status !== "completed" &&
                          "If face scan fails, enter Student ID and click Submit"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
