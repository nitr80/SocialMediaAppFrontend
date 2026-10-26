import { useState } from "react";
import PostContentTextArea from "../components/PostContentTextArea";
import AuthButton from "../components/AuthButton";
import { useLocation, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import BackToFeedButton from "../components/BackToFeedButton";
import { isAxiosError } from "axios";

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
              if (isAxiosError(err)) {
                alert(err.response?.data?.message || "Failed to create post");
              } else {
                alert("Failed to create post");
              }
            }
          }}
        ></AuthButton>
      </div>
    </div>
  );
};

export default CreatePostPage;
