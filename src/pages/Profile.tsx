import { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import NavbarStudent from "../components/NavbarStudent";
import NavbarAdmin from "../components/NavbarAdmin";
import NavbarEventOrganizer from "../components/NavbarEventOrganizer";
import NavbarSSG from "../components/NavbarSSG";
import NavbarStudentSSG from "../components/NavbarStudentSSG";
import NavbarStudentSSGEventOrganizer from "../components/NavbarStudentSSGEventOrganizer";
import defaultAvatar from "../assets/images/userprofile1.png";
import { FaCamera, FaSave, FaEdit } from "react-icons/fa";
import "../css/Profile.css";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface ProfileProps {
  role: string;
}

export const Profile: React.FC<ProfileProps> = ({ role }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data from API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch this from your backend
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();

        // Mock data - replace with actual API call
        const mockData: UserData = {
          id: "user123",
          name: "John Smith Doe",
          email: "john@email.com",
          role: role,
          avatar: null, // Initially no avatar
        };

        setUserData(mockData);
        setEditedEmail(mockData.email);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [role]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!userData) return;

    setIsLoading(true);
    try {
      // In a real app, you would send this to your backend
      // const formData = new FormData();
      // if (selectedFile) formData.append('avatar', selectedFile);
      // formData.append('email', editedEmail);

      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   body: formData
      // });

      // Mock update - replace with actual API call
      const updatedUser = {
        ...userData,
        email: editedEmail,
        avatar: previewImage || userData.avatar,
      };

      setUserData(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !userData) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Navbar Selection */}
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
        <h1>Role Not Found</h1>
      )}

      <div className="profile-container">
        <div className="profile-header">
          <h1>User Profile</h1>
          {!isEditing && (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <div className="avatar-container">
          <img
            src={previewImage || userData.avatar || defaultAvatar}
            alt="user profile"
            className="profile-avatar"
          />
          {isEditing && (
            <label className="avatar-upload">
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          )}
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>Name:</label>
            <p>{userData.name}</p>
          </div>

          <div className="info-item">
            <label>Role:</label>
            <p>
              {role.charAt(0).toUpperCase() + role.slice(1).replace("-", " ")}
            </p>
          </div>

          <div className="info-item">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="email-input"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="action-buttons">
            <button
              className="save-button"
              onClick={handleSave}
              disabled={isLoading}
            >
              <FaSave /> {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="cancel-button"
              onClick={() => {
                setIsEditing(false);
                setEditedEmail(userData.email);
                setSelectedFile(null);
                setPreviewImage(null);
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="logout-container">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
