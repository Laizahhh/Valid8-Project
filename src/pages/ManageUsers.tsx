import { useState } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import {
  AiFillEdit,
  AiFillCloseCircle,
  AiOutlineUserAdd,
} from "react-icons/ai";
import search_logo from "../assets/images/search_logo.png"; // Ensure correct path
import "../css/ManageUsers.css";

// Sample user data
const sampleUsers = [
  { name: "John Doe", email: "johndoe@example.com", role: "Admin" },
  { name: "Jane Smith", email: "janesmith@example.com", role: "Student" },
];

export const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(sampleUsers);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Admin Navbar Only */}
      <NavbarAdmin />

      <div className="manage-events container small-container">
        <h3>Manage Users</h3>

        {/* Search Box & Add User Button Positioned */}
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

        {/* Users Table */}
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
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="button-group">
                    <button className="btn btn-info">
                      <AiFillEdit /> Edit
                    </button>
                    <button className="btn btn-danger">
                      <AiFillCloseCircle /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4}>No matching users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
