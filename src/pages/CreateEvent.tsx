import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";

interface CreateEventProps {
  role: string;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ role }) => {
  return (
    <div>
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarEventOrganizer />
      )}

      <h1>Create Event</h1>
    </div>
  );
};

export default CreateEvent;
