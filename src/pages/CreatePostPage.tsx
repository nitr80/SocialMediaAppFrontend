import { useState } from "react";
import PostContentTextArea from "../components/post/PostContentTextArea";
import AuthButton from "../components/ui/AuthButton";
import { useLocation, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import BackToFeedButton from "../components/layout/BackToFeedButton";
import { getErrorMessage } from "../utils/errorUtils";
import StatusMessage from "../components/ui/StatusMessage";

const CreatePostPage = () => {
  const [text, setText] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const label = "Write a post:";
  const postString = "Post";

  const navigate = useNavigate();
  const location = useLocation();
  const { createPost } = usePosts();

  return (
    <div className="page">
      <BackToFeedButton></BackToFeedButton>
      <div className="card">
        <PostContentTextArea
          label={label}
          text={text}
          setText={(v) => {
            setText(v);
            setCreateError(null);
          }}
        ></PostContentTextArea>
        <StatusMessage type="error" message={createError} />
        <AuthButton
          buttonText={postString}
          disabled={isCreating || text.trim().length === 0}
          onClick={async () => {
            setCreateError(null);
            setIsCreating(true);
            try {
              await createPost(text);
              navigate("/feed", {
                state: { from: location.pathname },
              });
            } catch (err: unknown) {
              setCreateError(getErrorMessage(err, "Failed to create post"));
              setIsCreating(false);
            }
          }}
        ></AuthButton>
      </div>
    </div>
  );
};

export default CreatePostPage;
