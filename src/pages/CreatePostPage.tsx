import { useState } from "react";
import PostContentTextArea from "../components/PostContentTextArea";
import "./CreatePostPage.css";
import AuthButton from "../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

const CreatePostPage = () => {
  const [text, setText] = useState("");
  const label = "Write a post:";
  const postString = "Post";

  const navigate = useNavigate();
  const { postError, createPost } = usePosts();

  return (
    <div className="page">
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
              navigate("/feed");
            } catch (err: any) {
              alert(err.response?.data?.message ?? "Failed to create post");
            }
          }}
        ></AuthButton>
      </div>
    </div>
  );
};

export default CreatePostPage;
