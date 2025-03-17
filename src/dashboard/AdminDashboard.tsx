import { NavbarAdmin } from "../components/NavbarAdmin";
import Welcome from "../pages/Welcome";
const AdminDashboard = () => {
  return (
    <div className="admin">
      <NavbarAdmin />
      <Welcome />
    </div>
  );
};

export default AdminDashboard;
