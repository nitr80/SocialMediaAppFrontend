import { useEffect, useState } from "react";
import ExpandedPost from "../components/ExpandedPost";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post";
import { useParams } from "react-router-dom";
import { useLikes } from "../hooks/useLikes";
import "./PostDetailsPage.css";
import { useComments } from "../hooks/useComments";
import CommentCard from "../components/CommentCard";
import type { Comment } from "../types/comment";
import CommentInputField from "../components/CommentInputField";
import { useCommentLikes } from "../hooks/useCommentLikes";
import BackToFeedButton from "../components/BackToFeedButton";

const PostDetailsPage = () => {
  const { postLoading, getPostById } = usePosts();
  const { getLiked } = useLikes();
  const { loading, getAllCommentsByPostId, createComment } = useComments();
  const { getAllLikedComments } = useCommentLikes();

  const [post, setPost] = useState<Post>();
  const [likedPost, setLikedPost] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [likedCommentIds, setLikedCommentIds] = useState<number[]>([]);

  const { id } = useParams();
  if (!id) {
    return <div>Invalid ID</div>;
  }

  const postId = Number(id);
  if (isNaN(postId)) {
    return <div>Invalid ID</div>;
  }

  const fetchComments = async () => {
    const commentData = await getAllCommentsByPostId(postId);
    const likeCommentsIdData = await getAllLikedComments(postId);
    if (commentData) setComments(commentData);
    if (likeCommentsIdData) setLikedCommentIds(likeCommentsIdData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostById(postId);
      const likeData = await getLiked(postId);

      if (postData) setPost(postData);
      if (likeData) setLikedPost(likeData);

      await fetchComments();
    };

    fetchData();
  }, [postId]);

  const handleCommentCreation = async () => {
    try {
      await createComment(commentContent, postId);
      setCommentContent("");
      fetchComments();
    } catch (err: any) {
      alert(err.response?.data?.message ?? "Failed to create comment");
    }
  };

  if (!post) {
    return <div>Invalid Post</div>;
  }

  if (postLoading || loading) {
    return (
      <div className="page">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="post-details-page">
        <BackToFeedButton></BackToFeedButton>
        <div className="post-and-comments-container">
          <ExpandedPost post={post} isLiked={likedPost}></ExpandedPost>
          <div>
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                isLiked={likedCommentIds.includes(comment.id)}
              ></CommentCard>
            ))}
          </div>
        </div>

        <CommentInputField
          text={commentContent}
          setText={setCommentContent}
          onSendClicked={handleCommentCreation}
        ></CommentInputField>
      </div>
    );
  }
};

export default PostDetailsPage;
