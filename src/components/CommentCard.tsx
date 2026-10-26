import { useState } from "react";
import type { Comment } from "../types/comment";
import { toTimeOrDate } from "../utils/dateUtils";
import "./PostItem.css";
import { likeComment, unlikeComment } from "../api/commentLikesApi";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { getProfileImageUrl } from "../utils/imageUtils";

interface Props {
  comment: Comment;
  isLiked: boolean;
  // profilePicture
}

const CommentCard = ({ comment, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(comment.likeCount);

  const navigate = useNavigate();

  return (
    <div className="post-card">
      <img
        className="profile-picture"
        src={getProfileImageUrl(comment.author.profileImageUrl)}
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
      </div>
    </div>
  );
};

export default CommentCard;
