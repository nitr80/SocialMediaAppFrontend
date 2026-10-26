import { useState } from "react";
import type { Comment } from "../../types/comment";
import { toTimeOrDate } from "../../utils/dateUtils";
import "../post/PostItem.css";
import { useCommentLikes } from "../../hooks/useCommentLikes";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorUtils";
import Avatar from "../ui/Avatar";

interface Props {
  comment: Comment;
  isLiked: boolean;
}

const CommentCard = ({ comment, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(comment.likeCount);

  const { loading, likeComment, unlikeComment } = useCommentLikes();

  return (
    <div className="post-card">
      <Link
        to={`/profile/${comment.author.id}`}
        className="avatar-link"
        aria-label={`View ${comment.author.username}'s profile`}
      >
        <Avatar user={comment.author} alt="" />
      </Link>
      <div>
        <p className="creation-date-title">{toTimeOrDate(comment.createdAt)}</p>
        <p className="author-title">{comment.author.username}</p>
        <p className="post-content-text">{comment.content}</p>
        <div className="like-container">
          <button
            type="button"
            className="like-button"
            aria-pressed={liked}
            aria-label={liked ? "Unlike comment" : "Like comment"}
            onClick={async () => {
              if (loading) {
                return;
              }
              try {
                if (!liked) {
                  await likeComment(comment.id);
                  setLocalLikeCount((prevCount) => prevCount + 1);
                } else {
                  await unlikeComment(comment.id);
                  setLocalLikeCount((prevCount) => prevCount - 1);
                }
                setLiked((prevLiked) => !prevLiked);
              } catch (err: unknown) {
                alert(getErrorMessage(err, "Failed to like post card"));
              }
            }}
          >
            <img
              src={liked ? "/filled_heart_icon.png" : "/empty_heart_icon.png"}
              alt=""
            />
          </button>
          <p className="like-count">{localLikeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
