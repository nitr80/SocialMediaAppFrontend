import { useState } from "react";
import type { Comment } from "../../types/comment";
import { toTimeOrDate } from "../../utils/dateUtils";
import "../post/PostItem.css";
import { useCommentLikes } from "../../hooks/useCommentLikes";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorUtils";
import Avatar from "../ui/Avatar";

interface Props {
  comment: Comment;
  isLiked: boolean;
}

const CommentCard = ({ comment, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(comment.likeCount);

  const { likeComment, unlikeComment } = useCommentLikes();
  const navigate = useNavigate();

  return (
    <div className="post-card">
      <Avatar
        user={comment.author}
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
                alert(getErrorMessage(err, "Failed to like post card"));
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
