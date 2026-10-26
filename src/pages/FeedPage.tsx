import { useEffect, useState } from "react";
import PostCard from "../components/post/PostCard";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post";
import "./FeedPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useLikes } from "../hooks/useLikes";
import { useAuthStore } from "../store/authStore";
import UserSearchArea from "../components/user/UserSearchArea";
import PageLoader from "../components/ui/PageLoader";

const FeedPage = () => {
  const { loading, loadAllPosts } = usePosts();
  const { getAllLiked } = useLikes();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await loadAllPosts();
      const likeData = await getAllLiked();

      if (postData) setPosts(postData);
      if (likeData) setLikedPosts(likeData);
    };

    fetchPosts();
  }, [location.key, loadAllPosts, getAllLiked]);

  if (loading) {
    return <PageLoader />;
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
            type="button"
            className="profile-button"
            aria-label="Open your profile"
            onClick={() => {
              const user = useAuthStore.getState().user;
              if (user) {
                navigate(`/profile/${user.id}`);
              }
            }}
          >
            <img src="/user.png" alt="" />
          </button>
        </div>
        <div className="user-search-area-container">
          <UserSearchArea />
        </div>
        <div className="create-button-container">
          <button
            type="button"
            className="floating-create-button"
            aria-label="Create post"
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
