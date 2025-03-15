import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";

interface UpcomingEventsProps {
  role: string;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ role }) => {
  return (
    <div className="upcoming-header">
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarStudent />
      )}

      <h1>Upcoming Events</h1>
    </div>
  );
};

export default UpcomingEvents;
