import { useState } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiOutlineUserAdd,
} from "react-icons/ai";
import search_logo from "../assets/images/search_logo.png";
import "../css/ManageUsers.css";

const sampleUsers = [
  {
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    email: "johndoe@example.com",
    role: ["Admin"],
  },
  {
    firstName: "Jane",
    middleName: "",
    lastName: "Smith",
    email: "janesmith@example.com",
    role: ["Student"],
  },
];

export const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(sampleUsers);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [editedUser, setEditedUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: [] as string[],
  });

  const [newUser, setNewUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    role: [] as string[],
  });

  // Available roles
  const availableRoles = ["Admin", "Student", "SSG Officer", "Event Organizer"];
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [editRoleDropdownOpen, setEditRoleDropdownOpen] = useState(false);

  // Helper function to get full name
  const getFullName = (user) => {
    return [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ");
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedUser({ ...users[index] });
    setValidationErrors({});
  };

  const validateFields = (user, isNewUser = false) => {
    const errors: Record<string, string> = {};

    if (!user.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!user.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }

    if (isNewUser && !user.password.trim()) {
      errors.password = "Password is required";
    }

    if (user.role.length === 0) {
      errors.role = "At least one role must be selected";
    }

    return errors;
  };

  const handleSaveChanges = () => {
    const errors = validateFields(editedUser);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[editIndex!] = editedUser;
    setUsers(updatedUsers);
    setEditIndex(null);
    setValidationErrors({});
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    const updatedUsers = users.filter((_, i) => i !== deleteIndex);
    setUsers(updatedUsers);
    setDeleteIndex(null);
  };

  const toggleRoleSelection = (
    role: string,
    roles: string[],
    setRoles: (updatedRoles: string[]) => void
  ) => {
    const newRoles = roles.includes(role)
      ? roles.filter((r) => r !== role)
      : [...roles, role];
    setRoles(newRoles);
  };

  const handleAddUser = () => {
    const errors = validateFields(newUser, true);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const newUserObject = {
      firstName: newUser.firstName,
      middleName: newUser.middleName || "",
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };
    setUsers([...users, newUserObject]);
    setAddUserModalOpen(false);
    setNewUser({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      role: [],
    });
    setValidationErrors({});
  };

  return (
    <div>
      <NavbarAdmin />

      <div className="manage-events container small-container">
        <h3>Manage Users</h3>

        <div className="manage-users-header">
          <div className="search-manage-user">
            <input
              type="search"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search_logo} alt="search" className="search-icon" />
          </div>

          <button
            className="btn btn-warning add"
            onClick={() => {
              setAddUserModalOpen(true);
              setValidationErrors({});
            }}
          >
            <AiOutlineUserAdd /> Add New User
          </button>
        </div>

        <div className="manage-users-table">
          <table>
            <thead>
              <tr>
                <th className="manageusers-name">Name</th>
                <th className="manageusers-email">Email</th>
                <th className="manageusers-role">Role</th>
                <th className="manageusers-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  const fullName = getFullName(user);
                  return [fullName, user.email, user.role.join(", ")]
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                })
                .map((user, index) => (
                  <tr key={index}>
                    <td>{getFullName(user)}</td>
                    <td>{user.email}</td>
                    <td>{user.role.join(", ")}</td>
                    <td className="button-group">
                      <button
                        className="btn btn-info"
                        onClick={() => handleEditClick(index)}
                      >
                        <AiFillEdit /> Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(index)}
                      >
                        <AiFillCloseCircle /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4}>No matching users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-container"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "20px",
                fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
              }}
            >
              Add New User
            </h3>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className={validationErrors.firstName ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.firstName
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.firstName && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.firstName}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Middle Name"
                value={newUser.middleName}
                onChange={(e) =>
                  setNewUser({ ...newUser, middleName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className={validationErrors.lastName ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.lastName
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.lastName && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.lastName}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className={validationErrors.email ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.email
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.email && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className={validationErrors.password ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.password
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.password && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.password}
                </div>
              )}
            </div>

            <div
              className="form-group dropdown-wrapper"
              style={{ marginBottom: "15px" }}
            >
              <div className="dropdown" style={{ position: "relative" }}>
                <button
                  type="button"
                  className={`dropdown-btn ${
                    validationErrors.role ? "input-error" : ""
                  }`}
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    border: validationErrors.role
                      ? "1px solid #dc3545"
                      : "1px solid #ced4da",
                    borderRadius: "4px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  <span>
                    {newUser.role.length > 0
                      ? newUser.role.join(", ")
                      : "Select Roles"}
                  </span>
                  <span className="icon">{roleDropdownOpen ? "▲" : "▼"}</span>
                </button>
                {validationErrors.role && (
                  <div
                    className="error-message"
                    style={{
                      color: "#dc3545",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}
                  >
                    {validationErrors.role}
                  </div>
                )}
                {roleDropdownOpen && (
                  <div
                    className="dropdown-content"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      width: "100%",
                      maxHeight: "150px",
                      overflowY: "auto",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      zIndex: 10,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {availableRoles.map((role) => (
                      <label
                        key={role}
                        className="dropdown-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px",
                          cursor: "pointer",
                          backgroundColor: "#f8f9fa",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={newUser.role.includes(role)}
                          onChange={() =>
                            toggleRoleSelection(role, newUser.role, (roles) =>
                              setNewUser({ ...newUser, role: roles })
                            )
                          }
                          style={{ marginRight: "10px" }}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="button-group"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setAddUserModalOpen(false);
                  setValidationErrors({});
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddUser}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal - Updated with responsive styling */}
      {editIndex !== null && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-container"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "20px",
                fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
              }}
            >
              Edit User
            </h3>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={editedUser.firstName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
                placeholder="First Name"
                className={validationErrors.firstName ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.firstName
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.firstName && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.firstName}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={editedUser.middleName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, middleName: e.target.value })
                }
                placeholder="Middle Name"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={editedUser.lastName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
                placeholder="Last Name"
                className={validationErrors.lastName ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.lastName
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.lastName && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.lastName}
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                placeholder="Email"
                className={validationErrors.email ? "input-error" : ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: validationErrors.email
                    ? "1px solid #dc3545"
                    : "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
              {validationErrors.email && (
                <div
                  className="error-message"
                  style={{
                    color: "#dc3545",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  {validationErrors.email}
                </div>
              )}
            </div>

            {/* Role Dropdown - Updated with responsive styling */}
            <div
              className="form-group dropdown-wrapper"
              style={{ marginBottom: "15px" }}
            >
              <div className="dropdown" style={{ position: "relative" }}>
                <button
                  type="button"
                  className={`dropdown-btn ${
                    validationErrors.role ? "input-error" : ""
                  }`}
                  onClick={() => setEditRoleDropdownOpen(!editRoleDropdownOpen)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    border: validationErrors.role
                      ? "1px solid #dc3545"
                      : "1px solid #ced4da",
                    borderRadius: "4px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  <span>
                    {editedUser.role.length > 0
                      ? editedUser.role.join(", ")
                      : "Select Roles"}
                  </span>
                  <span className="icon">
                    {editRoleDropdownOpen ? "▲" : "▼"}
                  </span>
                </button>
                {validationErrors.role && (
                  <div
                    className="error-message"
                    style={{
                      color: "#dc3545",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}
                  >
                    {validationErrors.role}
                  </div>
                )}
                {editRoleDropdownOpen && (
                  <div
                    className="dropdown-content"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      width: "100%",
                      maxHeight: "150px",
                      overflowY: "auto",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      zIndex: 10,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {availableRoles.map((role) => (
                      <label
                        key={role}
                        className="dropdown-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px",
                          cursor: "pointer",
                          backgroundColor: "#f8f9fa",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={editedUser.role.includes(role)}
                          onChange={() =>
                            toggleRoleSelection(
                              role,
                              editedUser.role,
                              (roles) =>
                                setEditedUser({ ...editedUser, role: roles })
                            )
                          }
                          style={{ marginRight: "10px" }}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="button-group"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditIndex(null);
                  setValidationErrors({});
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveChanges}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Updated with responsive styling */}
      {deleteIndex !== null && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-container"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              Are you sure you want to delete this user?
            </p>
            <div
              className="button-group"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-danger"
                onClick={handleConfirmDelete}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteIndex(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for error styling */}
      <style>{`
        .error-message {
          color: #dc3545;
          font-size: 0.8rem;
          margin-top: 5px;
        }

        .input-error {
          border-color: #dc3545 !important;
        }

        .form-group {
          margin-bottom: 15px;
        }
        
      

      `}</style>
    </div>
  );
};

export default ManageUsers;
