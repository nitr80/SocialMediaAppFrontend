interface Props {
  label: string;
  text: string;
  setText: (text: string) => void;
}

const PostContentTextArea = ({ label, text, setText }: Props) => {
  return (
    <div>
      <label htmlFor="fcontent" className="input-label">
        {label}
      </label>
      <br />
      <textarea
        id="fcontent"
        name="fcontent"
        className="input-field post-content-text-area"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default PostContentTextArea;
