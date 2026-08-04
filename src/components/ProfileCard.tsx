import { useRef, useState } from "react";
import type { User } from "../types/user";
import BioInputField from "./BioInputField";
import { useUsers } from "../hooks/useUsers";
import type { Bio } from "../types/bio";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
}

const ProfileCard = ({ user }: Props) => {
  const EDIT_BIO_TEXT = "Edit Bio";
  const SAVE_BIO_TEXT = "Save Bio";

  const [canEditBio, setCanEditBio] = useState(false);
  const [editBioText, setEditBioText] = useState(EDIT_BIO_TEXT);
  const [bioText, setBioText] = useState(user.bio ?? "No bio yet");
  const [newUser, setUser] = useState(user);

  const { getUserById, addOrUpdateBio, addOrUpdateProfilePicture } = useUsers();
  const { logoutAsync } = useAuth();
  const navigate = useNavigate();

  const isCurrentUser = useAuthStore.getState().user?.id === newUser.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleImageSelected = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    await addOrUpdateProfilePicture(formData);

    const updatedUser = await getUserById(newUser.id);

    if (updatedUser) setUser(updatedUser);
  };

  return (
    <div className="profile-card">
      <div
        className="profile-picture-container"
        onClick={() => {
          if (isCurrentUser) fileInputRef.current?.click();
        }}
        // send the request to the api service
      >
        <img
          className="profile-picture-big"
          src={
            newUser.profileImageUrl
              ? `${API_URL}${newUser.profileImageUrl}`
              : "/user.png"
          }
          alt="Profile Picture"
        />
        {isCurrentUser && <div className="profile-picture-overlay">Edit</div>}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageSelected}
        />
      </div>
      <div>
        <p className="user-title-big">{newUser.username}</p>
        <p className="user-email-big">{newUser.email}</p>
        {!canEditBio && <p className="user-bio">{bioText}</p>}
        {canEditBio && isCurrentUser && (
          <BioInputField text={bioText} setText={setBioText}></BioInputField>
        )}
        {isCurrentUser && (
          <div className="logout-container">
            <p
              className="edit-bio-text"
              onClick={() => {
                if (!canEditBio) {
                  setCanEditBio(true);
                  setEditBioText(SAVE_BIO_TEXT);
                } else {
                  setCanEditBio(false);
                  setEditBioText(EDIT_BIO_TEXT);

                  const bio: Bio = { bio: bioText };
                  addOrUpdateBio(bio);
                }
              }}
            >
              {editBioText}
            </p>
            <p
              className="edit-bio-text"
              onClick={() => {
                try {
                  logoutAsync();
                  navigate("/")
                } catch (err : any) {
                  alert(err.response?.data?.message ?? "Failed to logout");
                }
              }}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
