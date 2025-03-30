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
  { name: "John Doe", email: "johndoe@example.com", role: ["Admin"] },
  { name: "Jane Smith", email: "janesmith@example.com", role: ["Student"] },
];

export const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(sampleUsers);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    role: [] as string[],
  });

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: [] as string[],
  });

  // Available roles
  const availableRoles = ["Admin", "Student", "SSG Officer", "Event Organizer"];
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedUser({ ...users[index] });
  };

  const handleSaveChanges = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex!] = editedUser;
    setUsers(updatedUsers);
    setEditIndex(null);
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
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    const newUserObject = {
      name: fullName,
      email: newUser.email,
      role: newUser.role,
    };
    setUsers([...users, newUserObject]);
    setAddUserModalOpen(false);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: [],
    });
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
            onClick={() => setAddUserModalOpen(true)}
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
                .filter((user) =>
                  [user.name, user.email, user.role.join(", ")]
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
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
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Add New User</h3>
            <input
              type="text"
              placeholder="First Name"
              required
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              required
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              required
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <div
              className="form-group dropdown-wrapper"
              style={{ margin: "10px 0" }}
            >
              <div className="dropdown" style={{ position: "relative" }}>
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "5px 0",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    {newUser.role.length > 0
                      ? newUser.role.join(", ")
                      : "Select Roles"}
                  </span>
                  <span className="icon">{roleDropdownOpen ? "▲" : "▼"}</span>
                </button>
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
                    }}
                  >
                    {availableRoles.map((role) => (
                      <label
                        key={role}
                        className="dropdown-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px",
                          cursor: "pointer",
                          backgroundColor: "#f8f9fa",
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
                          style={{ marginRight: "8px" }}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="button-group">
              <button
                className="btn btn-secondary"
                onClick={() => setAddUserModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddUser}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Edit User</h3>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              placeholder="Email"
            />

            {/* Role Dropdown */}
            <div className="form-group dropdown-wrapper">
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                >
                  <span>
                    {editedUser.role.length > 0
                      ? editedUser.role.join(", ")
                      : "Select Roles"}
                  </span>
                  <span className="icon">{roleDropdownOpen ? "▲" : "▼"}</span>
                </button>
                {roleDropdownOpen && (
                  <div
                    className="dropdown-content"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "5px",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      marginTop: "5px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {availableRoles.map((role) => (
                      <label
                        key={role}
                        className="dropdown-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "6px 12px",
                          cursor: "pointer",
                          width: "100%",
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
                          style={{ marginRight: "5px" }}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="button-group">
              <button
                className="btn btn-secondary"
                onClick={() => setEditIndex(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveChanges}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-container">
            <p>Are you sure you want to delete this user?</p>
            <div className="button-group">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteIndex(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
