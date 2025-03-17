import { NavbarStudent } from "../components/NavbarStudent";
import Welcome from "../pages/Welcome";
//default view is upcoming events
const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <NavbarStudent />
      <Welcome />
    </div>
  );
};

export default StudentDashboard;
