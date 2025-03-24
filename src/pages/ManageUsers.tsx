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
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
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

  // Toggle role selection
  const toggleRoleSelection = (role: string) => {
    setEditedUser((prevUser) => {
      const newRoles = prevUser.role.includes(role)
        ? prevUser.role.filter((r) => r !== role)
        : [...prevUser.role, role];
      return { ...prevUser, role: newRoles };
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

          <button className="btn btn-warning add">
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
                  <div className="dropdown-content">
                    {availableRoles.map((role) => (
                      <label key={role} className="dropdown-item">
                        <input
                          type="checkbox"
                          checked={editedUser.role.includes(role)}
                          onChange={() => toggleRoleSelection(role)}
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
