import { useEffect, useState } from "react";
import ProfileCard from "../components/user/ProfileCard";
import { useUsers } from "../hooks/useUsers";
import "./ProfilePage.css";
import type { User } from "../types/user";
import { useParams } from "react-router-dom";
import BackToFeedButton from "../components/layout/BackToFeedButton";
import PageLoader from "../components/ui/PageLoader";

const ProfilePage = () => {
  const { getUserById, loading } = useUsers();
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

  if (loading || !user) {
    return <PageLoader />;
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
