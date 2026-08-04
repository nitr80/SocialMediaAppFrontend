import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post";
import "./FeedPage.css";
import "../components/ProfileCard.css";
import { useNavigate } from "react-router-dom";
import { useLikes } from "../hooks/useLikes";
import ProfileCard from "../components/ProfileCard";
import { useAuthStore } from "../store/authStore";

const FeedPage = () => {
  const { postError, postLoading, loadAllPosts } = usePosts();
  const { getAllLiked } = useLikes();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await loadAllPosts();
      const likeData = await getAllLiked();

      if (postData) setPosts(postData);
      if (likeData) setLikedPosts(likeData);
    };

    fetchPosts();
  }, []);

  if (postLoading) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="feed-page">
        {/* <div className="left-panel"></div> */}
        <div className="posts-container">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLiked={likedPosts.includes(post.id)}
            ></PostCard>
          ))}
        </div>
        <div className="profile-button-container">
          <button
            className="profile-button"
            onClick={() => {
              const user = useAuthStore.getState().user;
              if (user) {
                navigate(`/profile/${user.id}`);
              }
            }}
          >
            <img src="/user.png" alt="Profile" />
          </button>
        </div>
        <div className="create-button-container">
          <button
            className="floating-create-button"
            onClick={() => {
              navigate("/create-post");
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
};

export default FeedPage;
