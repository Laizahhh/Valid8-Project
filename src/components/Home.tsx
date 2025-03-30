import "../App.css"; // Import App.css for styling
import LoginForm from "./LoginForm";

// Import images
import schoolImage from "../assets/images/logo-jrmsu.jpg";
import backgroundImage from "../assets/images/bg_image.jpg"; // Import the background image

export const Home = () => {
  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Main Content Section */}
      <div className="main-content">
        {/* University Information */}
        <div className="university-info">
          <h2 className="university-name">
            Jose Rizal Memorial State University
          </h2>
          <h3 className="system-title">Event Attendance Management System</h3>
          <p className="campus-location">Main Campus, Dapitan City</p>
        </div>

        {/* Login Form Container */}
        <div className="form-container">
          <img src={schoolImage} alt="School Logo" className="school-logo" />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
