import { useState, useEffect } from "react";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaGraduationCap,
  FaTimes,
  FaChevronDown,
  FaCheck,
  FaSpinner,
  FaInfoCircle,
} from "react-icons/fa";
import "../css/CreateEvent.css";

interface CreateEventProps {
  role: string;
}

// Updated SSG interfaces to match ManageEvent
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface SSGMember {
  user_id: number;
  position: string;
  user: User;
}

interface Program {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface EventFormData {
  name: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled"; // Changed to lowercase to match API
  ssg_member_ids: number[];
  program_ids: number[];
  department_ids: number[];
}

export const CreateEvent: React.FC<CreateEventProps> = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    location: "",
    start_datetime: "",
    end_datetime: "",
    status: "upcoming", // Matching backend enum format (uppercase)
    ssg_member_ids: [],
    program_ids: [],
    department_ids: [],
  });

  // Updated to use SSGMember interface matching ManageEvent
  const [ssgMembers, setSSGMembers] = useState<SSGMember[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Dropdown states
  const [ssgDropdownOpen, setSsgDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [departmentsDropdownOpen, setDepartmentsDropdownOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Improved fetchWithAuth function with better error handling
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      throw new Error("No authentication token found");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        throw new Error("Session expired. Please login again.");
      }

      // If response is not OK, try to parse error details
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        let errorMessage = `HTTP error! status: ${response.status}`;

        try {
          // Try to parse error as JSON
          errorData = JSON.parse(errorText);
          console.error("API Error Response:", errorData);

          // Extract error message from common API error formats
          if (errorData.detail) {
            errorMessage =
              typeof errorData.detail === "string"
                ? errorData.detail
                : JSON.stringify(errorData.detail);
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === "object") {
            // Handle validation errors that might be nested
            errorMessage = JSON.stringify(errorData);
          }
        } catch (e) {
          // If not JSON, use raw error text
          console.error("API Error (non-JSON):", errorText);
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      return response;
    } catch (err) {
      console.error(`Error fetching ${url}:`, err);
      throw err;
    }
  };

  // Function to format dates for API submission
  const formatDateForAPI = (dateString: string) => {
    if (!dateString) return "";
    // Ensure date is in ISO format (which API expects)
    return new Date(dateString).toISOString();
  };

  // Check if user is logged in before fetching data
  const checkAuthentication = (): boolean => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to access this page");
      setLoading(false);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!checkAuthentication()) return;

      try {
        // Use fetchWithAuth for all API calls
        const [ssgResponse, programsResponse, deptsResponse] =
          await Promise.all([
            fetchWithAuth(`${BASE_URL}/users/by-role/ssg`),
            fetchWithAuth(`${BASE_URL}/programs/`),
            fetchWithAuth(`${BASE_URL}/departments/`),
          ]);

        // Parse responses
        const [ssgData, programsData, deptsData] = await Promise.all([
          ssgResponse.json(),
          programsResponse.json(),
          deptsResponse.json(),
        ]);

        // Transform SSG members to match the structure in ManageEvent
        const transformedMembers = Array.isArray(ssgData)
          ? ssgData
              .filter((member) => member && typeof member === "object")
              .map((user) => ({
                user_id: user.id,
                position: user.ssg_profile?.position || "Member",
                user: {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                },
              }))
          : [];

        setSSGMembers(transformedMembers);
        setPrograms(Array.isArray(programsData) ? programsData : []);
        setDepartments(Array.isArray(deptsData) ? deptsData : []);

        setError(null);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dropdown options. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateTimeChange = (
    field: "start_datetime" | "end_datetime",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation errors related to dates
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleSelection = (
    type: "ssg_member_ids" | "program_ids" | "department_ids",
    id: number
  ) => {
    setFormData((prev) => {
      const currentIds = prev[type];
      const newIds = currentIds.includes(id)
        ? currentIds.filter((itemId) => itemId !== id)
        : [...currentIds, id];
      return { ...prev, [type]: newIds };
    });
    // Clear related validation error if any
    if (validationErrors[type]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Basic validations
    if (!formData.name.trim()) errors.name = "Event name is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.start_datetime)
      errors.start_datetime = "Start date & time is required";
    if (!formData.end_datetime)
      errors.end_datetime = "End date & time is required";

    // Validate start date is before end date
    if (formData.start_datetime && formData.end_datetime) {
      const start = new Date(formData.start_datetime);
      const end = new Date(formData.end_datetime);

      if (start >= end) {
        errors.end_datetime = "End date & time must be after start date & time";
      }
    }

    // Check if start date is in the past
    const now = new Date();
    const start = formData.start_datetime
      ? new Date(formData.start_datetime)
      : null;
    if (start && start < now) {
      errors.start_datetime = "Start date & time should be in the future";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Improved handleSubmit with better error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check authentication before submitting
    if (!checkAuthentication()) return;

    // First validate the form
    if (!validateForm()) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Format dates correctly for API
      const apiFormData = {
        ...formData,
        start_datetime: formatDateForAPI(formData.start_datetime),
        end_datetime: formatDateForAPI(formData.end_datetime),
      };

      console.log("Submitting event data:", apiFormData);

      // Use fetchWithAuth for POST request
      const response = await fetchWithAuth(`${BASE_URL}/events/`, {
        method: "POST",
        body: JSON.stringify(apiFormData),
      });

      const result = await response.json();
      setSuccessMessage(`Event "${result.name}" created successfully!`);

      // Reset form
      setFormData({
        name: "",
        location: "",
        start_datetime: "",
        end_datetime: "",
        status: "upcoming",
        ssg_member_ids: [],
        program_ids: [],
        department_ids: [],
      });

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error creating event:", err);

      // Improved error handling with proper extraction of error message
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null) {
        setError(JSON.stringify(err));
      } else {
        setError(
          "Failed to create event. Please check your data and try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedItemsLabel = (
    type: "ssg_member_ids" | "program_ids" | "department_ids"
  ) => {
    const selectedIds = formData[type];
    let items: { name: string }[] = [];

    if (type === "ssg_member_ids") {
      items = ssgMembers
        .filter((member) => selectedIds.includes(member.user_id))
        .map((member) => ({
          name: `${member.user?.first_name || "Unknown"} ${
            member.user?.last_name || "User"
          }`,
        }));
    } else if (type === "program_ids") {
      items = programs.filter((program) => selectedIds.includes(program.id));
    } else if (type === "department_ids") {
      items = departments.filter((dept) => selectedIds.includes(dept.id));
    }

    if (items.length === 0) return "Select options";
    if (items.length === 1) return items[0].name;
    if (items.length > 3) return `${items.length} selected`;
    return items.map((item) => item.name).join(", ");
  };

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Check if click is outside dropdown areas
      if (!target.closest(".custom-dropdown")) {
        setSsgDropdownOpen(false);
        setProgramsDropdownOpen(false);
        setDepartmentsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to render a login prompt if not authenticated
  const renderLoginPrompt = () => (
    <div className="page-container">
      <div className="navbar-container">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
      </div>
      <div className="content-container">
        <div className="error-message">
          <FaTimes className="error-icon" />
          {error}
        </div>
        <div className="login-prompt">
          <p>Please log in to access the event creation form.</p>
          <button onClick={() => navigate("/login")} className="primary-button">
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );

  // Return login prompt if authentication error occurs
  if (!loading && error?.includes("log in")) {
    return renderLoginPrompt();
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="navbar-container">
          {role === "student-ssg-eventorganizer" ? (
            <NavbarStudentSSGEventOrganizer />
          ) : (
            <NavbarEventOrganizer />
          )}
        </div>
        <div className="loading-container">
          <FaSpinner className="spinner-icon" />
          Loading event data...
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="navbar-container">
        {role === "student-ssg-eventorganizer" ? (
          <NavbarStudentSSGEventOrganizer />
        ) : (
          <NavbarEventOrganizer />
        )}
      </div>

      <div className="content-container">
        {error && (
          <div className="error-message">
            <FaTimes className="error-icon" />
            {error}
            <button onClick={() => setError(null)} className="dismiss-button">
              Dismiss
            </button>
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            <FaCheck className="success-icon" />
            {successMessage}
            <button
              onClick={() => setSuccessMessage("")}
              className="dismiss-button"
            >
              Dismiss
            </button>
          </div>
        )}

        <h2>Create New Event</h2>
        <p className="subtitle">
          Fill in the details below to create a new event
        </p>

        <form onSubmit={handleSubmit} className="event-form">
          <div className={`form-group ${validationErrors.name ? "error" : ""}`}>
            <label>
              <FaCalendarAlt className="icon" />
              Event Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter Event Name"
              className={validationErrors.name ? "input-error" : ""}
            />
            {validationErrors.name && (
              <div className="error-text">{validationErrors.name}</div>
            )}
          </div>

          <div
            className={`form-group ${validationErrors.location ? "error" : ""}`}
          >
            <label>
              <FaMapMarkerAlt className="icon" />
              Location*
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Enter Location"
              className={validationErrors.location ? "input-error" : ""}
            />
            {validationErrors.location && (
              <div className="error-text">{validationErrors.location}</div>
            )}
          </div>

          <div className="form-row">
            <div
              className={`form-group ${
                validationErrors.start_datetime ? "error" : ""
              }`}
            >
              <label>
                <FaCalendarAlt className="icon" />
                Start Date & Time*
              </label>
              <input
                type="datetime-local"
                value={formData.start_datetime}
                onChange={(e) =>
                  handleDateTimeChange("start_datetime", e.target.value)
                }
                required
                className={validationErrors.start_datetime ? "input-error" : ""}
              />
              {validationErrors.start_datetime && (
                <div className="error-text">
                  {validationErrors.start_datetime}
                </div>
              )}
            </div>

            <div
              className={`form-group ${
                validationErrors.end_datetime ? "error" : ""
              }`}
            >
              <label>
                <FaCalendarAlt className="icon" />
                End Date & Time*
              </label>
              <input
                type="datetime-local"
                value={formData.end_datetime}
                onChange={(e) =>
                  handleDateTimeChange("end_datetime", e.target.value)
                }
                required
                className={validationErrors.end_datetime ? "input-error" : ""}
              />
              {validationErrors.end_datetime && (
                <div className="error-text">
                  {validationErrors.end_datetime}
                </div>
              )}
            </div>
          </div>

          <div className="form-info-box">
            <FaInfoCircle className="info-icon" />
            <span>
              Select SSG members, programs, and departments for this event. At
              least one selection is recommended.
            </span>
          </div>

          {/* SSG Members Dropdown - Updated to match ManageEvent logic */}
          <div
            className={`form-group ${
              validationErrors.ssg_member_ids ? "error" : ""
            }`}
          >
            <label>
              <FaUsers className="icon" />
              Assign SSG Members
            </label>
            <div
              className={`custom-dropdown ${ssgDropdownOpen ? "active" : ""}`}
            >
              <div
                className="dropdown-header"
                onClick={() => {
                  setSsgDropdownOpen(!ssgDropdownOpen);
                  setProgramsDropdownOpen(false);
                  setDepartmentsDropdownOpen(false);
                }}
              >
                <span>{getSelectedItemsLabel("ssg_member_ids")}</span>
                <FaChevronDown
                  className={`dropdown-icon ${ssgDropdownOpen ? "open" : ""}`}
                />
              </div>
              {ssgDropdownOpen && (
                <div className="dropdown-options">
                  {loading ? (
                    <div className="dropdown-loading">
                      <FaSpinner className="spinner-icon" /> Loading...
                    </div>
                  ) : ssgMembers.length === 0 ? (
                    <div className="dropdown-empty">
                      {error
                        ? "Failed to load SSG members"
                        : "No SSG members available"}
                    </div>
                  ) : (
                    ssgMembers.map((member) => (
                      <div
                        key={member.user_id}
                        className="dropdown-option"
                        onClick={() =>
                          toggleSelection("ssg_member_ids", member.user_id)
                        }
                      >
                        <div
                          className={`checkbox ${
                            formData.ssg_member_ids.includes(member.user_id)
                              ? "checked"
                              : ""
                          }`}
                        >
                          {formData.ssg_member_ids.includes(member.user_id) && (
                            <FaCheck className="check-icon" />
                          )}
                        </div>
                        <span>
                          {member.user?.first_name || "Unknown"}{" "}
                          {member.user?.last_name || "User"} ({member.position})
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            {validationErrors.ssg_member_ids && (
              <div className="error-text">
                {validationErrors.ssg_member_ids}
              </div>
            )}
          </div>

          {/* Programs Dropdown */}
          <div
            className={`form-group ${
              validationErrors.program_ids ? "error" : ""
            }`}
          >
            <label>
              <FaGraduationCap className="icon" />
              Select Programs
            </label>
            <div
              className={`custom-dropdown ${
                programsDropdownOpen ? "active" : ""
              }`}
            >
              <div
                className="dropdown-header"
                onClick={() => {
                  setProgramsDropdownOpen(!programsDropdownOpen);
                  setSsgDropdownOpen(false);
                  setDepartmentsDropdownOpen(false);
                }}
              >
                <span>{getSelectedItemsLabel("program_ids")}</span>
                <FaChevronDown
                  className={`dropdown-icon ${
                    programsDropdownOpen ? "open" : ""
                  }`}
                />
              </div>
              {programsDropdownOpen && (
                <div className="dropdown-options">
                  {programs.length === 0 ? (
                    <div className="dropdown-empty">No programs available</div>
                  ) : (
                    programs.map((program) => (
                      <div
                        key={program.id}
                        className="dropdown-option"
                        onClick={() =>
                          toggleSelection("program_ids", program.id)
                        }
                      >
                        <div
                          className={`checkbox ${
                            formData.program_ids.includes(program.id)
                              ? "checked"
                              : ""
                          }`}
                        >
                          {formData.program_ids.includes(program.id) && (
                            <FaCheck className="check-icon" />
                          )}
                        </div>
                        <span>{program.name}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            {validationErrors.program_ids && (
              <div className="error-text">{validationErrors.program_ids}</div>
            )}
          </div>

          {/* Departments Dropdown */}
          <div
            className={`form-group ${
              validationErrors.department_ids ? "error" : ""
            }`}
          >
            <label>
              <FaGraduationCap className="icon" />
              Select Departments
            </label>
            <div
              className={`custom-dropdown ${
                departmentsDropdownOpen ? "active" : ""
              }`}
            >
              <div
                className="dropdown-header"
                onClick={() => {
                  setDepartmentsDropdownOpen(!departmentsDropdownOpen);
                  setSsgDropdownOpen(false);
                  setProgramsDropdownOpen(false);
                }}
              >
                <span>{getSelectedItemsLabel("department_ids")}</span>
                <FaChevronDown
                  className={`dropdown-icon ${
                    departmentsDropdownOpen ? "open" : ""
                  }`}
                />
              </div>
              {departmentsDropdownOpen && (
                <div className="dropdown-options">
                  {departments.length === 0 ? (
                    <div className="dropdown-empty">
                      No departments available
                    </div>
                  ) : (
                    departments.map((dept) => (
                      <div
                        key={dept.id}
                        className="dropdown-option"
                        onClick={() =>
                          toggleSelection("department_ids", dept.id)
                        }
                      >
                        <div
                          className={`checkbox ${
                            formData.department_ids.includes(dept.id)
                              ? "checked"
                              : ""
                          }`}
                        >
                          {formData.department_ids.includes(dept.id) && (
                            <FaCheck className="check-icon" />
                          )}
                        </div>
                        <span>{dept.name}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            {validationErrors.department_ids && (
              <div className="error-text">
                {validationErrors.department_ids}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setFormData({
                  name: "",
                  location: "",
                  start_datetime: "",
                  end_datetime: "",
                  status: "upcoming",
                  ssg_member_ids: [],
                  program_ids: [],
                  department_ids: [],
                });
                setError(null);
                setValidationErrors({});
              }}
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner-icon" /> Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
