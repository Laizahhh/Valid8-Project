import { Link } from "react-router-dom";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/NavbarAdmin.css";
import userprofile from "../assets/images/userprofile.png";

export const NavbarAdmin = () => {
  return (
    <div className="admin-header">
      <div className="admin-navbar">
        <img src={logoValid8} alt="Valid 8 logo" className="logo" />
        <h1 className="page-name">Admin</h1>
        <div className="admin-menu">
          <ul>
            <li>
              <Link to="/admin_events" className="admin-navigation-link">
                Events
              </Link>
            </li>
            <li>
              <Link to="/admin_reports" className="admin-navigation-link">
                Reports
              </Link>
            </li>
            <li>
              <Link to="/admin_manage_users" className="admin-navigation-link">
                Manage Users
              </Link>
            </li>
            <li>
              <Link to="/admin_profile" className="admin-profile-link">
                <img
                  src={userprofile}
                  alt="user profile"
                  className="admin-userprofile"
                />
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
