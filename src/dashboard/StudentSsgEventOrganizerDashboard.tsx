import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import Welcome from "../pages/Welcome";

const StudentSsgEventDashboard = () => {
  return (
    <div className="student-ssg-event-Dashboard">
      <NavbarStudentSSGEventOrganizer />
      <Welcome />
    </div>
  );
};

export default StudentSsgEventDashboard;
