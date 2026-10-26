import { useNavigate } from "react-router-dom";
import "./BackToFeedButton.css";

const BackToFeedButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-to-feed-button-container">
      <button
        type="button"
        className="back-to-feed-button"
        aria-label="Back to feed"
        onClick={() => {
          navigate("/feed");
        }}
      >
        &lt;-
      </button>
    </div>
  );
};

export default BackToFeedButton;
