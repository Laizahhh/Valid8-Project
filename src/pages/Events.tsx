import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { NavbarSSG } from "../components/NavbarSSG";

interface EventsProps {
  role: string;
}

export const Events: React.FC<EventsProps> = ({ role }) => {
  return (
    <div>
      {/* Dynamically select the navbar based on the role */}
      {role === "admin" ? (
        <NavbarAdmin />
      ) : role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <h1>Events</h1>
    </div>
  );
};

export default Events;
