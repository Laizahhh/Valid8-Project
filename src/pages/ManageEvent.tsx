import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";

interface ManageEventProps {
  role: string;
}

export const ManageEvent: React.FC<ManageEventProps> = ({ role }) => {
  return (
    <div>
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : (
        <NavbarEventOrganizer />
      )}

      <h1>Manage Event</h1>
    </div>
  );
};

export default ManageEvent;
