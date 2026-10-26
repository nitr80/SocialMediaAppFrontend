import { useState } from "react";
import { useLikes } from "../../hooks/useLikes";
import { toTimeOrDate } from "../../utils/dateUtils";

import "./ExpandedPost.css";
import "./PostItem.css";
import type { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorUtils";
import Avatar from "../ui/Avatar";

interface Props {
  post: Post;
  isLiked: boolean;
}

const ExpandedPost = ({ post, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(post.likeCount);

  const { loading, likePost, unlikePost } = useLikes();
  const navigate = useNavigate();

  return (
    <div className="expanded-post-container">
      <Avatar
        user={post.author}
        onClick={() => {
          navigate(`/profile/${post.author.id}`);
        }}
      />
      <div>
        <p className="creation-date-title">{toTimeOrDate(post.createdAt)}</p>
        <p className="author-title">{post.author.username}</p>
        <p className="post-content-text-detailed">{post.content}</p>

        <div className="bottom-icon-bar">
          <div
            className="like-container"
            onClick={async () => {
              if (loading) {
                return;
              }

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
                alert(getErrorMessage(err, "Failed to like post card"));
              }
            }}
          >
            <button className="like-button">
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

export default ExpandedPost;
