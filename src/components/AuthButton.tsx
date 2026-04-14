import "./AuthButton.css"

interface Props {
  buttonText: string;
  onClick: () => void;
}

const AuthButton = ({ buttonText, onClick }: Props) => {
  return (
    <div className="auth-button-container">
      <button className="auth-button" onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default AuthButton;
