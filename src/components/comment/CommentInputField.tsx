import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import "./CommentInputField.css";

interface Props {
  text: string;
  setText: (text: string) => void;
  onSendClicked: () => void;
}

const CommentInputField = ({ text, setText, onSendClicked }: Props) => {
  const { textareaRef, handleChange } = useAutoResizeTextarea(setText);

  return (
    <div className="comment-input-field-container">
      <div className="comment-input-field">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          className="input-field comment-input-field-content"
          rows={1}
        />
        <button className="send-button" onClick={onSendClicked}>
          <img src="/send_icon.png" alt="Post comment" />
        </button>
      </div>
    </div>
  );
};

export default CommentInputField;
