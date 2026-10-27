import "./AuthButton.css";

interface Props {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
}

const AuthButton = ({ buttonText, onClick, disabled = false }: Props) => {
  return (
    <div className="auth-button-container">
      <button
        type="button"
        className="auth-button"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AuthButton;
