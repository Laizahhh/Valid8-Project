import "../App.css";
import LoginForm from "./LoginForm";

// Import images

import schoolImage from "../assets/images/logo-jrmsu.jpg";
import { HomeContainer } from "./HomeContainer";

export const Home = () => {
  return (
    <div>
      <HomeContainer />

      {/* Main Content Section */}
      <div className="main-content">
        {/* Login Form Container */}
        <div className="form-container">
          {/* School Image Inside the Form Container (Above "User Login") */}
          <img src={schoolImage} alt="School Logo" className="school-logo" />

          {/* Login Form Component */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
