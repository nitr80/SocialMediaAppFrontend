import { useState } from "react";
import type { Comment } from "../types/comment";
import { toTimeOrDate } from "../utils/dateUtils";
import "./PostCard.css";
import { likeComment, unlikeComment } from "../api/commentLikesApi";
import { useNavigate } from "react-router-dom";

interface Props {
  comment: Comment;
  isLiked: boolean;
  // profilePicture
}

const CommentCard = ({ comment, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(comment.likeCount);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="post-card">
      <img
        className="profile-picture"
        src={
          comment.author.profileImageUrl
            ? `${API_URL}${comment.author.profileImageUrl}`
            : "/user.png"
        }
        alt="Profile Picture"
        onClick={() => {
          navigate(`/profile/${comment.author.id}`);
        }}
      />
      <div>
        <p className="creation-date-title">{toTimeOrDate(comment.createdAt)}</p>
        <p className="author-title">{comment.author.username}</p>
        <p className="post-content-text">{comment.content}</p>
        <div className="like-container">
          <button
            className="like-button"
            onClick={async () => {
              try {
                if (!liked) {
                    await likeComment(comment.id);
                  setLocalLikeCount(localLikeCount + 1);
                } else {
                  await unlikeComment(comment.id);
                  setLocalLikeCount(localLikeCount - 1);
                }
                setLiked(!liked);
              } catch (err: any) {
                alert(
                  err.response?.data?.message ?? "Failed to like post card",
                );
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
      </div>
    </div>
  );
};

export default CommentCard;
