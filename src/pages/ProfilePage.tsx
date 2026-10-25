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

  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    if (!id || !Number.isInteger(userId) || userId <= 0) {
      return;
    }

    const fetchUser = async () => {
      const userData = await getUserById(userId);

      if (userData) {
        setUser(userData);
      }
    };

    fetchUser();
  }, [userId, getUserById, id]);

  if (!id || !Number.isInteger(userId) || userId <= 0) {
    return <div>Invalid ID</div>;
  }

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
