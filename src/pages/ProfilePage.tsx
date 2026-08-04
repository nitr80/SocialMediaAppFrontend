import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { useUsers } from "../hooks/useUsers";
import "./ProfilePage.css";
import type { User } from "../types/user";
import { useParams } from "react-router-dom";
import BackToFeedButton from "../components/BackToFeedButton";

const ProfilePage = () => {
  const { getUserById, userLoading } = useUsers();
  const [user, setUser] = useState<User>();
  const [bio, setBio] = useState<string | undefined>("");

  const { id } = useParams();
  if (!id) {
    return <div>Invalid ID</div>;
  }

  const userId = Number(id);
  if (isNaN(userId)) {
    return <div>Invalid ID</div>;
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(userId);

      if (userData) {
        setUser(userData);
        setBio(userData.bio);
      }
    };

    fetchUser();
  }, []);

  if (userLoading || !user) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="profile-page">
        <BackToFeedButton></BackToFeedButton>
        <ProfileCard user={user}></ProfileCard>
      </div>
    );
  }
};

export default ProfilePage;
