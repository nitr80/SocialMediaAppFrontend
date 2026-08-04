import { useRef } from "react";
import "./BioInputField.css";

interface Props {
  text: string;
  setText: (text: string) => void;
}

const BioInputField = ({ text, setText }: Props) => {
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
    <div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className="input-field bio-input-field"
        rows={1}
      />
    </div>
  );
};

export default BioInputField;
