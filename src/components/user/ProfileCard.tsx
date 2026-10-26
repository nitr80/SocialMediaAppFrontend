import { useEffect, useRef, useState } from "react";
import "./ProfileCard.css";
import type { User } from "../../types/user";
import BioInputField from "./BioInputField";
import { useUsers } from "../../hooks/useUsers";
import type { Bio } from "../../types/bio";
import { useAuthStore } from "../../store/authStore";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useFollows } from "../../hooks/useFollows";
import { getErrorMessage } from "../../utils/errorUtils";
import Avatar from "../ui/Avatar";

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
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [followText, setFollowText] = useState<string>("Follow");

  const { getUserById, addOrUpdateBio, addOrUpdateProfilePicture } = useUsers();
  const { logoutAsync } = useAuth();
  const { getFollowingStatus, followUser, unfollowUser } = useFollows();
  const navigate = useNavigate();

  const isCurrentUser = useAuthStore.getState().user?.id === newUser.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (!isCurrentUser) {
        const status = await getFollowingStatus(newUser.id);
        setIsFollowing(status);
        setFollowText(status ? "Unfollow" : "Follow");
      }
    };

    fetchFollowingStatus();
  }, [newUser.id, isCurrentUser, getFollowingStatus]);

  useEffect(() => {
    const fetchUserBio = async () => {
      const updatedUser = await getUserById(newUser.id);
      if (updatedUser) {
        setUser(updatedUser);
        setBioText(updatedUser.bio ?? "No bio yet");
      }
    };

    fetchUserBio();
  }, [newUser.id, getUserById]);

  const handleImageSelected = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    const newProfileImageUrl = await addOrUpdateProfilePicture(formData);

    if (newProfileImageUrl) {
      setUser((prevUser) => ({
        ...prevUser,
        profileImageUrl: newProfileImageUrl,
      }));
    }
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
        <Avatar user={newUser} className="profile-picture-big" />
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
              onClick={async () => {
                if (!canEditBio) {
                  setCanEditBio(true);
                  setEditBioText(SAVE_BIO_TEXT);
                } else {
                  setCanEditBio(false);
                  setEditBioText(EDIT_BIO_TEXT);

                  const bio: Bio = { bio: bioText };
                  try {
                    await addOrUpdateBio(bio);
                  } catch (err: unknown) {
                    alert(getErrorMessage(err, "Failed to update bio"));
                  }
                }
              }}
            >
              {editBioText}
            </p>
            <p
              className="edit-bio-text"
              onClick={async () => {
                try {
                  await logoutAsync();
                  navigate("/");
                } catch (err: unknown) {
                  alert(getErrorMessage(err, "Failed to logout"));
                }
              }}
            >
              Logout
            </p>
          </div>
        )}
        {!isCurrentUser && (
          <div className="logout-container">
            <p
              className="edit-bio-text"
              onClick={async () => {
                if (isFollowing) {

                  try {
                    await unfollowUser(newUser.id);
                    setFollowText("Follow");
                    setIsFollowing(false);
                  } catch (err: unknown) {
                    alert(getErrorMessage(err, "Failed to unfollow user"));
                  }
                } else {
                  try {
                    await followUser(newUser.id);
                    setFollowText("Unfollow");
                    setIsFollowing(true);
                  } catch (err: unknown) {
                    alert(getErrorMessage(err, "Failed to follow user"));
                  }
                }
              }}
            >
              [{followText}]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
