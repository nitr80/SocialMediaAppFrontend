import { useState } from "react";
import PostContentTextArea from "../components/post/PostContentTextArea";
import AuthButton from "../components/ui/AuthButton";
import { useLocation, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import BackToFeedButton from "../components/layout/BackToFeedButton";
import { getErrorMessage } from "../utils/errorUtils";

const CreatePostPage = () => {
  const [text, setText] = useState("");
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
          setText={setText}
        ></PostContentTextArea>
        <AuthButton
          buttonText={postString}
          onClick={async () => {
            try {
              await createPost(text);
              navigate("/feed", {
                state: { from: location.pathname },
              });
            } catch (err: unknown) {
              alert(getErrorMessage(err, "Failed to create post"));
            }
          }}
        ></AuthButton>
      </div>
    </div>
  );
};

export default CreatePostPage;
