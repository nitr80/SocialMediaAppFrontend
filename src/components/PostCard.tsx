import { useState } from "react";
import "./PostItem.css";
import { useLikes } from "../hooks/useLikes";
import { useNavigate } from "react-router-dom";
import { toTimeOrDate } from "../utils/dateUtils";
import type { Post } from "../types/post";
import { isAxiosError } from "axios";

interface Props {
  post: Post;
  isLiked: boolean;
  // profilePicture
}
const PostCard = ({ post, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);
  const { likePost, unlikePost } = useLikes();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="post-card">
      <img
        className="profile-picture"
        src={
          post.author.profileImageUrl
            ? `${API_URL}${post.author.profileImageUrl}`
            : "/user.png"
        }
        alt="Profile Picture"
        onClick={() => {
          navigate(`/profile/${post.author.id}`);
        }}
      />

      <div
        className="post-text-container"
        onClick={() => {
          navigate(`/post-details/${post.id}`);
        }}
      >
        <p className="creation-date-title">{toTimeOrDate(post.createdAt)}</p>
        <p className="author-title">{post.author.username}</p>
        <p className="post-content-text">{post.content}</p>

        <div className="bottom-icon-bar">
          <div className="like-container">
            <button
              className="like-button"
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  if (!liked) {
                    await likePost(post.id);
                    setLocalLikeCount(localLikeCount + 1);
                  } else {
                    await unlikePost(post.id);
                    setLocalLikeCount(localLikeCount - 1);
                  }
                  setLiked(!liked);
                } catch (err: unknown) {
                  if (isAxiosError(err)) {
                    alert(
                      err.response?.data?.message ?? "Failed to like post card",
                    );
                  } else {
                    alert("Failed to like post card");
                  }
                }
              }}
            >
              <img
                src={liked ? "/filled_heart_icon.png" : "/empty_heart_icon.png"}
                alt="Like"
              />
            </button>
            <p className="like-count">{localLikeCount}</p>
          </div>

          <div className="comment-icon-container">
            <img src="/comment_icon.png" alt="Comment" />
            <p className="comment-count">{post.commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
