import { useCallback, useEffect, useRef, useState } from "react";
import PostCard from "../components/post/PostCard";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post";
import "./FeedPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import UserSearchArea from "../components/user/UserSearchArea";

const FeedPage = () => {
  const { loading, loadAllPosts } = usePosts();
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const limit = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const observerTarget = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  const fetchPosts = useCallback(
    async (cursor: string | null, initial = false) => {
      if (isFetching.current) return;

      isFetching.current = true;

      try {
        const postData = await loadAllPosts(limit, cursor);

        if (postData) {
          setPosts((prev) =>
            initial ? postData.values : [...prev, ...postData.values],
          );

          setNextCursor(postData.cursor);
          console.log(postData);
        }
      } catch (error) {
        console.error("Failed to load feed", error);
      } finally {
        isFetching.current = false;
      }
    },
    [loadAllPosts],
  );

  useEffect(() => {
    async function initializeFeed() {
      setPosts([]);
      setNextCursor(null);

      await fetchPosts(null, true);
    }

    initializeFeed();
  }, [location.key, fetchPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor && !loading) {
          fetchPosts(nextCursor);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0,
      },
    );

    const target = observerTarget.current;

    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [nextCursor, loading, fetchPosts]);

  return (
    <div className="feed-page">
      {/* <div className="left-panel"></div> */}
      <div className="posts-container">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isLiked={post.hasLiked}
          ></PostCard>
        ))}
        {loading && <p>Loading more posts...</p>}
        <div ref={observerTarget} />
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
};

export default FeedPage;
