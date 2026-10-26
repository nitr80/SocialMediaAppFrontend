import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import "./BioInputField.css";

interface Props {
  text: string;
  setText: (text: string) => void;
}

const BioInputField = ({ text, setText }: Props) => {
  const { textareaRef, handleChange } = useAutoResizeTextarea(setText);

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
