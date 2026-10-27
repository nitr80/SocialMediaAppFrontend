import { useCallback, useEffect, useState } from "react";
import ExpandedPost from "../components/post/ExpandedPost";
import { usePosts } from "../hooks/usePosts";
import type { Post } from "../types/post";
import { useParams } from "react-router-dom";
import { useLikes } from "../hooks/useLikes";
import "./PostDetailsPage.css";
import { useComments } from "../hooks/useComments";
import CommentCard from "../components/comment/CommentCard";
import type { Comment } from "../types/comment";
import CommentInputField from "../components/comment/CommentInputField";
import { useCommentLikes } from "../hooks/useCommentLikes";
import BackToFeedButton from "../components/layout/BackToFeedButton";
import { getErrorMessage } from "../utils/errorUtils";
import PageLoader from "../components/ui/PageLoader";
import StatusMessage from "../components/ui/StatusMessage";

const PostDetailsPage = () => {
  const { loading: postLoading, getPostById } = usePosts();
  const { getLiked } = useLikes();
  const { loading, getAllCommentsByPostId, createComment } = useComments();
  const { getAllLikedComments } = useCommentLikes();

  const [post, setPost] = useState<Post>();
  const [likedPost, setLikedPost] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [likedCommentIds, setLikedCommentIds] = useState<number[]>([]);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  const { id } = useParams();
  const postId = Number(id);

  const fetchComments = useCallback(async () => {
    const commentData = await getAllCommentsByPostId(postId);
    const likeCommentsIdData = await getAllLikedComments(postId);
    if (commentData) setComments(commentData);
    if (likeCommentsIdData) setLikedCommentIds(likeCommentsIdData);
  }, [getAllCommentsByPostId, getAllLikedComments, postId]);

  useEffect(() => {
    if (!id || !Number.isInteger(postId) || postId <= 0) {
      return;
    }

    const fetchData = async () => {
      const postData = await getPostById(postId);
      const likeData = await getLiked(postId);

      if (postData) setPost(postData);
      if (likeData) setLikedPost(likeData);

      await fetchComments();
    };

    fetchData();
  }, [postId, id, fetchComments, getPostById, getLiked]);

  const handleCommentCreation = async () => {
    if (loading || isCreatingComment || !commentContent.trim()) {
      return;
    }

    setCommentError(null);
    setIsCreatingComment(true);
    try {
      await createComment(commentContent, postId);
      setCommentContent("");
      await fetchComments();
    } catch (err: unknown) {
      setCommentError(getErrorMessage(err, "Failed to create comment"));
    } finally {
      setIsCreatingComment(false);
    }
  };

  if (!id || !Number.isInteger(postId) || postId <= 0) {
    return <div>Invalid ID</div>;
  }

  if (!post) {
    return <div>Invalid Post</div>;
  }

  if (postLoading || loading) {
    return <PageLoader />;
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
          setText={(v) => {
            setCommentContent(v);
            setCommentError(null);
          }}
          onSendClicked={handleCommentCreation}
        ></CommentInputField>
        <StatusMessage type="error" message={commentError} />
      </div>
    );
  }
};

export default PostDetailsPage;
