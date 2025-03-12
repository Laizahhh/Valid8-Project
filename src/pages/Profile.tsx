import LogoutButton from "../components/LogoutButton";

interface ProfileProps {
  role: string;
}

export const Profile: React.FC<ProfileProps> = ({ role }) => {
  return (
    <div>
      <h1>{role.charAt(0).toUpperCase() + role.slice(1)} Profile</h1>
      <LogoutButton />
    </div>
  );
};

export default Profile;
