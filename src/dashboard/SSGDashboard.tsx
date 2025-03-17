import { NavbarSSG } from "../components/NavbarSSG";
import Welcome from "../pages/Welcome";
const SSGDashboard = () => {
  return (
    <div className="ssg-dashboard">
      <NavbarSSG />
      <Welcome />
    </div>
  );
};

export default SSGDashboard;
