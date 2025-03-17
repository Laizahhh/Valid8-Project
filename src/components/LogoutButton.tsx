import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logout_button from "../assets/images/logout_button.png";
import "../css/Profile.css";

const LogoutButton = () => {
  const [showConfirm, setShowConfirm] = useState(false); // Track confirmation popup
  const [showOverlay, setShowOverlay] = useState(false); // Show overlay after logout
  const navigate = useNavigate();

  // Show confirmation popup
  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  // Handle confirmed logout
  const handleConfirmLogout = () => {
    setShowOverlay(true); // Show full-screen logout overlay
    setTimeout(() => {
      localStorage.clear(); // Clear stored user session
      navigate("/", { replace: true }); // Redirect to homepage
    }, 1500); // Delay for a better effect
  };

  // Cancel confirmation and return to profile
  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {/* Logout Button */}
      <button onClick={handleLogoutClick} className="logout-btn">
        <img src={logout_button} alt="logout button" className="logout" />
        Logout
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="confirm-popup">
          <p>Are you sure you want to logout?</p>
          <div className="confirm-buttons">
            <button className="yes-button" onClick={handleConfirmLogout}>
              Yes
            </button>
            <button className="no-button" onClick={handleCancelLogout}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Logout Overlay (Full Page Effect) */}
      {showOverlay && (
        <div className="confirm-popup">
          <p>Logging out...</p>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
