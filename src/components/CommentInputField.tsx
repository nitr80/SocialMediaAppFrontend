import { useRef } from "react";
import "./CommentInputField.css";

interface Props {
  text: string;
  setText: (text: string) => void;
  onSendClicked: () => void;
}

const CommentInputField = ({ text, setText, onSendClicked }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const lineHeight = 20; // match CSS line-height

    const maxHeight = lineHeight * 3;

    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  };

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
