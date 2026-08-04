import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackToFeedButton.css";

const BackToFeedButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-to-feed-button-container">
      <button
        className="back-to-feed-button"
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
