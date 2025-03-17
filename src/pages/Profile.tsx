import LogoutButton from "../components/LogoutButton";
import NavbarStudent from "../components/NavbarStudent";
import NavbarAdmin from "../components/NavbarAdmin";
import NavbarEventOrganizer from "../components/NavbarEventOrganizer";
import NavbarSSG from "../components/NavbarSSG";
import NavbarStudentSSG from "../components/NavbarStudentSSG";
import NavbarStudentSSGEventOrganizer from "../components/NavbarStudentSSGEventOrganizer";
import userprofile1 from "../assets/images/userprofile1.png";
import "../css/Profile.css";

interface ProfileProps {
  role: string;
}

export const Profile: React.FC<ProfileProps> = ({ role }) => {
  return (
    <div>
      {/* ✅ Corrected Navbar Logic */}
      {role === "student-ssg" ? (
        <NavbarStudentSSG />
      ) : role === "student-ssg-eventorganizer" ? (
        <NavbarStudentSSGEventOrganizer />
      ) : role === "student" ? (
        <NavbarStudent />
      ) : role === "admin" ? (
        <NavbarAdmin />
      ) : role === "event-organizer" ? (
        <NavbarEventOrganizer />
      ) : role === "ssg" ? (
        <NavbarSSG />
      ) : (
        <h1>Role Not Found</h1> // Fallback for unknown roles
      )}

      <div className="profile-container">
        <img src={userprofile1} alt="user profile" />

        <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Profile</h1>
        <h2>Name: John Smith Doe</h2>
        <h3>Email: john@email.com</h3>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
