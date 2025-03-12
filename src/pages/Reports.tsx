import { NavbarAdmin } from "../components/NavbarAdmin";

interface ReportsProps {
  role: string;
}

export const Reports: React.FC<ReportsProps> = ({ role }) => {
  return (
    <div>
      {/* Admin Navbar Only */}
      <NavbarAdmin />

      <h1>Reports</h1>
    </div>
  );
};

export default Reports;
