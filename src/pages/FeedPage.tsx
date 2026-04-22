import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post";
import "./FeedPage.css";
import { useNavigate } from "react-router-dom";

const FeedPage = () => {
  const { postError, postLoading, loadAllPosts, createPost } = usePosts();
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await loadAllPosts();

      if (data) setPosts(data);
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
        <div className="left-panel"></div>
        <div className="posts-container">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              content={post.content}
              authorName={post.author.username}
              createdAt={post.createdAt}
              likeCount={post.likeCount}
            ></PostCard>
          ))}
        </div>
        <div className="right-panel">
          <button className="floating-create-button" onClick={() => {
            navigate("/create-post");
          }}>
            +
          </button>
        </div>
      </div>
    );
  }
};

export default FeedPage;
