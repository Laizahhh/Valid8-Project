import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";

interface AttendanceProps {
  role: string;
}

export const Attendance: React.FC<AttendanceProps> = ({ role }) => {
  return (
    <div>
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <h1>Attendance</h1>
    </div>
  );
};

export default Attendance;
