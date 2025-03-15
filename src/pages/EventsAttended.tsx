import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";

interface EventsAttendedProps {
  role: string;
}

export const EventsAttended: React.FC<EventsAttendedProps> = ({ role }) => {
  return (
    <div>
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarStudent />
      )}

      <h1>Events Attended</h1>
    </div>
  );
};

export default EventsAttended;
