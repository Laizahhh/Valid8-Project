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
        return (
          <span className="ams-status-badge ams-pending">Not Started</span>
        );
      case "time-in":
        return (
          <span className="ams-status-badge ams-time-in">Time In Recorded</span>
        );
      case "checkpoint":
        return (
          <span className="ams-status-badge ams-checkpoint">
            Checkpoint Recorded
          </span>
        );
      case "time-out":
        return (
          <span className="ams-status-badge ams-time-out">
            Time Out Recorded
          </span>
        );
      case "completed":
        return (
          <span className="ams-status-badge ams-completed">Completed</span>
        );
      default:
        return (
          <span className="ams-status-badge ams-pending">Not Started</span>
        );
    }
  };

  return (
    <div className="ams-page">
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
        <div className="ams-camera-modal">
          <div className="ams-camera-modal-content">
            <h3>Face Scanning</h3>
            <p>Please position your face within the frame</p>

            <div className="ams-camera-container">
              <video ref={videoRef} width="640" height="480" autoPlay />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                style={{ display: "none" }}
              />
            </div>

            <div className="ams-camera-controls">
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

      <div className="ams-container">
        <div className="ams-header">
          <div className="ams-header-content">
            <h2 className="ams-title">Attendance Monitoring System</h2>
            <p className="ams-subtitle">
              Official record keeping for university events and activities
            </p>
          </div>

          <div className="ams-search-container">
            <div className="ams-search-box">
              <img src={search_logo} alt="search" className="ams-search-icon" />
              <input
                type="search"
                placeholder="Search events or descriptions..."
                className="ams-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="ams-content">
          {filteredEvents.length === 0 ? (
            <div className="ams-no-results">
              <div className="ams-no-results-content">
                <p>No matching events found</p>
                <small>Please try a different search term</small>
              </div>
            </div>
          ) : (
            <div className="ams-cards">
              {filteredEvents.map((event, index) => (
                <div key={index} className="ams-card">
                  <div
                    className="ams-card-header-image"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    <div className="ams-header-overlay">
                      <div className="ams-event-badge">
                        {getStatusBadge(event.status)}
                      </div>
                      <h3>{event.name}</h3>
                      <div className="ams-event-details">
                        <span>
                          <FiCalendar className="ams-detail-icon" />{" "}
                          {event.date}
                        </span>
                        <span>
                          <FiMapPin className="ams-detail-icon" />{" "}
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ams-card-body">
                    <p className="ams-event-description">{event.description}</p>

                    <div className="ams-student-info-section">
                      <div className="ams-info-icon">
                        <FiUser size={24} />
                      </div>
                      <div className="ams-info-content">
                        <h4>Student Information</h4>
                        <div className="ams-form-section">
                          <div className="ams-form-group">
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

                          <div className="ams-form-group">
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

                          <div className="ams-form-group">
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

                    <div className="ams-time-records-section">
                      <div className="ams-time-record">
                        <h4>Time In</h4>
                        <div className="ams-time-input-group">
                          <button
                            className={`ams-btn ams-face-scan-btn ${
                              scanning === index && scanType === "timeIn"
                                ? "ams-scanning"
                                : ""
                            } ${event.timeIn ? "ams-success" : ""}`}
                            onClick={() => startFaceScan(index, "timeIn")}
                            disabled={!!event.timeIn || scanning !== null}
                          >
                            <FaRegSmileBeam className="ams-face-scan-icon" />
                            {event.timeIn
                              ? "Recorded"
                              : scanning === index && scanType === "timeIn"
                              ? "Scanning..."
                              : "Face Scan"}
                          </button>
                          <div className="ams-time-display">
                            {event.timeIn ? (
                              <span className="ams-recorded">
                                <FiClock /> {event.timeIn}
                              </span>
                            ) : (
                              <span className="ams-pending">Not recorded</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="ams-time-record">
                        <h4>Checkpoint</h4>
                        <div className="ams-time-input-group">
                          <button
                            className={`ams-btn ams-face-scan-btn ${
                              scanning === index && scanType === "checkpoint"
                                ? "ams-scanning"
                                : ""
                            } ${event.checkpoint ? "ams-success" : ""}`}
                            onClick={() => startFaceScan(index, "checkpoint")}
                            disabled={
                              !event.timeIn ||
                              !!event.checkpoint ||
                              scanning !== null
                            }
                          >
                            <FaRegSmileBeam className="ams-face-scan-icon" />
                            {event.checkpoint
                              ? "Recorded"
                              : scanning === index && scanType === "checkpoint"
                              ? "Scanning..."
                              : "Face Scan"}
                          </button>
                          <div className="ams-time-display">
                            {event.checkpoint ? (
                              <span className="ams-recorded">
                                <FiClock /> {event.checkpoint}
                              </span>
                            ) : (
                              <span className="ams-pending">
                                {event.timeIn
                                  ? "Not recorded"
                                  : "Complete Time In first"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="ams-time-record">
                        <h4>Time Out</h4>
                        <div className="ams-time-input-group">
                          <button
                            className={`ams-btn ams-face-scan-btn ${
                              scanning === index && scanType === "timeOut"
                                ? "ams-scanning"
                                : ""
                            } ${event.timeOut ? "ams-success" : ""}`}
                            onClick={() => startFaceScan(index, "timeOut")}
                            disabled={
                              !event.checkpoint ||
                              !!event.timeOut ||
                              scanning !== null
                            }
                          >
                            <FaRegSmileBeam className="ams-face-scan-icon" />
                            {event.timeOut
                              ? "Recorded"
                              : scanning === index && scanType === "timeOut"
                              ? "Scanning..."
                              : "Face Scan"}
                          </button>
                          <div className="ams-time-display">
                            {event.timeOut ? (
                              <span className="ams-recorded">
                                <FiClock /> {event.timeOut}
                              </span>
                            ) : (
                              <span className="ams-pending">
                                {event.checkpoint
                                  ? "Not recorded"
                                  : "Complete Checkpoint first"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ams-submit-section">
                      <button
                        className="ams-submit-btn"
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
                      <p className="ams-alternative-text">
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
