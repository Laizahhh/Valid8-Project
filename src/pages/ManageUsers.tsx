import { NavbarAdmin } from "../components/NavbarAdmin";

export const ManageUsers: React.FC = () => {
  return (
    <div>
      {/* Admin Navbar Only */}
      <NavbarAdmin />

      <h1>Manage Users</h1>
    </div>
  );
};

export default ManageUsers;
