import { NavbarAdmin } from "../components/NavbarAdmin";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <NavbarAdmin />
      <div className="container mt-4">
        {/* Welcoming Description */}
        <div className="welcome-section text-center p-4">
          <h2>Welcome to the Valid8 Admin Dashboard</h2>
          <p className="text-muted">
            Your centralized hub for managing events, users, and reports.
            Oversee the system, track activities, and ensure a seamless
            experience for all users.
          </p>
        </div>

        {/* Dashboard Info Section */}
        <div className="dashboard-info d-flex justify-content-center gap-4 mt-3">
          <div className="info-card p-3 shadow rounded">
            <h5>🔍 Monitor Events</h5>
            <p>View and manage all upcoming and past events efficiently.</p>
          </div>
          <div className="info-card p-3 shadow rounded">
            <h5>👥 Manage Users</h5>
            <p>Control user access, assign roles, and keep records updated.</p>
          </div>
          <div className="info-card p-3 shadow rounded">
            <h5>📊 View Reports</h5>
            <p>Analyze reports to ensure smooth event management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
