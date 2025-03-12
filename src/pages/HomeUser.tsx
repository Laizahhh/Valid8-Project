import { NavbarStudent } from "../components/NavbarStudent";
import { NavbarStudentSSG } from "../components/NavbarStudentSSG";
import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import { NavbarStudentSSGEventOrganizer } from "../components/NavbarStudentSSGEventOrganizer";
import { NavbarSSG } from "../components/NavbarSSG";

interface HomeUserProps {
  role: string;
}

export const HomeUser: React.FC<HomeUserProps> = ({ role }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("Role:", role); // Debugging to check role

  return (
    <div className="home-header">
      {/* Dynamically select the navbar based on the role */}
      {role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "event-organizer" ? (
        <NavbarEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <NavbarStudent />
      )}

      <h1>
        Welcome,{" "}
        {user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : "User"}
      </h1>
    </div>
  );
};

export default HomeUser;
