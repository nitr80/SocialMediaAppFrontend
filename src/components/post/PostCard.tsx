import { useState } from "react";
import "./PostItem.css";
import { useLikes } from "../../hooks/useLikes";
import { Link } from "react-router-dom";
import { toTimeOrDate } from "../../utils/dateUtils";
import type { Post } from "../../types/post";
import { getErrorMessage } from "../../utils/errorUtils";
import Avatar from "../ui/Avatar";
import StatusMessage from "../ui/StatusMessage";

interface Props {
  post: Post;
  isLiked: boolean;
}
const PostCard = ({ post, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);
  const [likeError, setLikeError] = useState<string | null>(null);
  const { loading, likePost, unlikePost } = useLikes();

  return (
    <div className="post-card">
      <Link
        to={`/profile/${post.author.id}`}
        className="avatar-link"
        aria-label={`View ${post.author.username}'s profile`}
      >
        <Avatar user={post.author} alt="" />
      </Link>

      <div>
        <Link to={`/post-details/${post.id}`} className="post-content-link">
          <p className="creation-date-title">{toTimeOrDate(post.createdAt)}</p>
          <p className="author-title">{post.author.username}</p>
          <p className="post-content-text">{post.content}</p>
        </Link>

        <div className="bottom-icon-bar">
          <div className="like-container">
            <button
              type="button"
              className="like-button"
              aria-pressed={liked}
              aria-label={liked ? "Unlike post" : "Like post"}
              disabled={loading}
              onClick={async () => {
                setLikeError(null);

                try {
                  if (!liked) {
                    await likePost(post.id);
                    setLocalLikeCount((prevCount) => prevCount + 1);
                  } else {
                    await unlikePost(post.id);
                    setLocalLikeCount((prevCount) => prevCount - 1);
                  }
                  setLiked((prevLiked) => !prevLiked);
                } catch (err: unknown) {
                  setLikeError(getErrorMessage(err, "Failed to like post"));
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

          <div className="comment-icon-container">
            <img src="/comment_icon.png" alt="Comment" />
            <p className="comment-count">{post.commentCount}</p>
          </div>
        </div>
        <StatusMessage type="error" message={likeError} />
      </div>
    </div>
  );
};

export default PostCard;
