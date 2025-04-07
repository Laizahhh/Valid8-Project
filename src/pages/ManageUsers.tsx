import { useState } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiOutlineUserAdd,
} from "react-icons/ai";
import search_logo from "../assets/images/search_logo.png";
import Modal from "react-modal";
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
  {
    firstName: "Robert",
    middleName: "James",
    lastName: "Johnson",
    email: "rjohnson@example.com",
    role: ["Event Organizer"],
  },
  {
    firstName: "Maria",
    middleName: "Garcia",
    lastName: "Lopez",
    email: "mlopez@example.com",
    role: ["SSG Officer", "Student"],
  },
  {
    firstName: "David",
    middleName: "William",
    lastName: "Brown",
    email: "dbrown@example.com",
    role: ["Admin", "Event Organizer"],
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

  const availableRoles = ["Admin", "Student", "SSG Officer", "Event Organizer"];
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [editRoleDropdownOpen, setEditRoleDropdownOpen] = useState(false);

  Modal.setAppElement("#root");

  const getFullName = (user: any) => {
    return [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ");
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedUser({ ...users[index] });
    setValidationErrors({});
  };

  const validateFields = (user: any, isNewUser = false) => {
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

  const getRoleBadge = (role: string) => {
    let badgeClass = "";
    switch (role) {
      case "Admin":
        badgeClass = "badge bg-primary";
        break;
      case "Student":
        badgeClass = "badge bg-success";
        break;
      case "SSG Officer":
      case "Event Organizer":
        badgeClass = "badge bg-warning";
        break;
      default:
        badgeClass = "badge bg-secondary";
    }
    return <span className={badgeClass}>{role}</span>;
  };

  const filteredUsers = users.filter((user) => {
    const fullName = getFullName(user);
    return [fullName, user.email, user.role.join(", ")]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="manage-users-page">
      <NavbarAdmin />
      <div className="manage-users-container">
        <header className="manage-users-header">
          <h2>User Management</h2>
          <p className="subtitle">
            View and manage all system users and their permissions
          </p>
        </header>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-box">
            <img src={search_logo} alt="search" className="search-icon" />
            <input
              type="search"
              placeholder="Search users by name, email or role..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary add-user-btn"
            onClick={() => {
              setAddUserModalOpen(true);
              setValidationErrors({});
            }}
          >
            <AiOutlineUserAdd /> Add New User
          </button>
        </div>

        {/* Users Table */}
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td data-label="Name">{getFullName(user)}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Roles">
                    <div className="role-badges">
                      {user.role.map((role, i) => (
                        <span key={i}>{getRoleBadge(role)}</span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Actions" className="actions-cell">
                    <div className="button-group">
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
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="no-results">
                    No matching users found. Try a different search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add User Modal */}
        <Modal
          isOpen={addUserModalOpen}
          onRequestClose={() => {
            setAddUserModalOpen(false);
            setValidationErrors({});
          }}
          className="user-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Add New User</h3>
            <button
              onClick={() => {
                setAddUserModalOpen(false);
                setValidationErrors({});
              }}
              className="close-button"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className={validationErrors.firstName ? "input-error" : ""}
              />
              {validationErrors.firstName && (
                <div className="error-message">
                  {validationErrors.firstName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name (Optional)</label>
              <input
                type="text"
                id="middleName"
                placeholder="Middle Name"
                value={newUser.middleName}
                onChange={(e) =>
                  setNewUser({ ...newUser, middleName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className={validationErrors.lastName ? "input-error" : ""}
              />
              {validationErrors.lastName && (
                <div className="error-message">{validationErrors.lastName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className={validationErrors.email ? "input-error" : ""}
              />
              {validationErrors.email && (
                <div className="error-message">{validationErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className={validationErrors.password ? "input-error" : ""}
              />
              {validationErrors.password && (
                <div className="error-message">{validationErrors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label>Roles</label>
              <div className="dropdown-wrapper">
                <div className="dropdown">
                  <button
                    type="button"
                    className={`dropdown-btn ${
                      validationErrors.role ? "input-error" : ""
                    }`}
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  >
                    {newUser.role.length > 0 ? (
                      <div className="selected-roles">
                        {newUser.role.map((role) => (
                          <span key={role} className="selected-role-badge">
                            {role}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>Select Roles</span>
                    )}
                    <span className="icon">{roleDropdownOpen ? "▲" : "▼"}</span>
                  </button>
                  {validationErrors.role && (
                    <div className="error-message">{validationErrors.role}</div>
                  )}
                  {roleDropdownOpen && (
                    <div className="dropdown-content">
                      {availableRoles.map((role) => (
                        <label key={role} className="dropdown-item radio-style">
                          <input
                            type="checkbox"
                            checked={newUser.role.includes(role)}
                            onChange={() =>
                              toggleRoleSelection(role, newUser.role, (roles) =>
                                setNewUser({ ...newUser, role: roles })
                              )
                            }
                            className="radio-input"
                          />
                          <span className="radio-custom"></span>
                          {role}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setAddUserModalOpen(false);
                setValidationErrors({});
              }}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAddUser}>
              Add User
            </button>
          </div>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={editIndex !== null}
          onRequestClose={() => {
            setEditIndex(null);
            setValidationErrors({});
          }}
          className="user-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Edit User</h3>
            <button
              onClick={() => {
                setEditIndex(null);
                setValidationErrors({});
              }}
              className="close-button"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="editFirstName">First Name</label>
              <input
                type="text"
                id="editFirstName"
                value={editedUser.firstName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
                className={validationErrors.firstName ? "input-error" : ""}
              />
              {validationErrors.firstName && (
                <div className="error-message">
                  {validationErrors.firstName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="editMiddleName">Middle Name (Optional)</label>
              <input
                type="text"
                id="editMiddleName"
                value={editedUser.middleName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, middleName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="editLastName">Last Name</label>
              <input
                type="text"
                id="editLastName"
                value={editedUser.lastName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
                className={validationErrors.lastName ? "input-error" : ""}
              />
              {validationErrors.lastName && (
                <div className="error-message">{validationErrors.lastName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="editEmail">Email</label>
              <input
                type="email"
                id="editEmail"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                className={validationErrors.email ? "input-error" : ""}
              />
              {validationErrors.email && (
                <div className="error-message">{validationErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label>Roles</label>
              <div className="dropdown-wrapper">
                <div className="dropdown">
                  <button
                    type="button"
                    className={`dropdown-btn ${
                      validationErrors.role ? "input-error" : ""
                    }`}
                    onClick={() =>
                      setEditRoleDropdownOpen(!editRoleDropdownOpen)
                    }
                  >
                    {editedUser.role.length > 0 ? (
                      <div className="selected-roles">
                        {editedUser.role.map((role) => (
                          <span key={role} className="selected-role-badge">
                            {role}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>Select Roles</span>
                    )}
                    <span className="icon">
                      {editRoleDropdownOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  {validationErrors.role && (
                    <div className="error-message">{validationErrors.role}</div>
                  )}
                  {editRoleDropdownOpen && (
                    <div className="dropdown-content">
                      {availableRoles.map((role) => (
                        <label key={role} className="dropdown-item radio-style">
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
                            className="radio-input"
                          />
                          <span className="radio-custom"></span>
                          {role}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEditIndex(null);
                setValidationErrors({});
              }}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteIndex !== null}
          onRequestClose={() => setDeleteIndex(null)}
          className="confirmation-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h3>Confirm Deletion</h3>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
            {deleteIndex !== null && (
              <p className="user-to-delete">
                {getFullName(users[deleteIndex])} ({users[deleteIndex].email})
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDeleteIndex(null)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleConfirmDelete}>
              Delete User
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageUsers;
