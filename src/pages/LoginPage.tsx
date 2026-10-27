import { useState } from "react";
import AuthButton from "../components/ui/AuthButton";
import DataInputField from "../components/ui/DataInputField";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorUtils";
import StatusMessage from "../components/ui/StatusMessage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <div className="auth-page-container">
          <p className="auth-page-title">Login</p>
          <DataInputField
            label="Username:"
            value={username}
            setValue={setUsername}
            autoComplete="username"
          ></DataInputField>
          <DataInputField
            label="Password:"
            value={password}
            setValue={setPassword}
            type="password"
            autoComplete="current-password"
          ></DataInputField>
          <StatusMessage type="error" message={error} />
          <AuthButton
            buttonText="Login"
            disabled={isSubmitting}
            onClick={async () => {
              setError(null);
              setIsSubmitting(true);
              try {
                await login(username, password);
                navigate("/feed", { replace: true });
              } catch (err: unknown) {
                setError(getErrorMessage(err, "Login failed!"));
                setIsSubmitting(false);
              }
            }}
          ></AuthButton>
          <Link to="/register" className="auth-link">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
