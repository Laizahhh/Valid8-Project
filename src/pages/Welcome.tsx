import { useState } from "react";
import logoValid8 from "../assets/images/logo-valid83_transparent.png";
import "../css/Welcome.css";

export const Welcome = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="welcome-popup">
        {/* Logo + Welcome Text Side by Side */}
        <div className="welcome-header">
          <img src={logoValid8} alt="Valid8 Logo" className="welcome-logo" />
          <div className="welcome-message">
            <h1>Welcome!</h1>
          </div>
        </div>

        {/* Valid8 Text */}
        <div className="welcome-valid8">
          <span className="valid8-text">Valid8</span>
        </div>

        {/* OK Button */}
        <div className="ok-button">
          <button onClick={handleClosePopup}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
