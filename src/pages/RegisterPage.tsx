import { useState } from "react";
import AuthButton from "../components/ui/AuthButton";
import DataInputField from "../components/ui/DataInputField";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorUtils";
import StatusMessage from "../components/ui/StatusMessage";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();

  const navigate = useNavigate();

  function passwordIncludesNumber() {
    return (
      password.includes("0") ||
      password.includes("1") ||
      password.includes("2") ||
      password.includes("3") ||
      password.includes("4") ||
      password.includes("5") ||
      password.includes("6") ||
      password.includes("7") ||
      password.includes("8") ||
      password.includes("9")
    );
  }

  function passwordIncludesSymbol() {
    return (
      password.includes("!") ||
      password.includes("?") ||
      password.includes("*") ||
      password.includes("&") ||
      password.includes("#")
    );
  }

  function validatePassword() {
    if (password.length < 8) {
      return "Password must have at least 8 characters";
    }

    if (!passwordIncludesNumber()) {
      return "Password must contain at least one number";
    }

    if (!passwordIncludesSymbol()) {
      return "Password must contain at least one symbol";
    }

    if (password != secondPassword) {
      return "2 entered passwords do not match!";
    }

    return null;
  }

  function validateEmail() {
    if (!email.includes("@")) {
      return "Invalid Email!";
    }

    return null;
  }

  return (
    <div className="page">
      <div className="card">
        <div className="auth-page-container">
          <p className="auth-page-title">Register</p>
          <DataInputField
            label="Username:"
            value={username}
            setValue={(v) => {
              setUsername(v);
              setFormError(null);
            }}
            autoComplete="username"
          ></DataInputField>
          <DataInputField
            label="Email:"
            value={email}
            setValue={(v) => {
              setEmail(v);
              setEmailError(null);
              setFormError(null);
            }}
            type="email"
            autoComplete="email"
          ></DataInputField>
          <StatusMessage type="error" message={emailError} />
          <DataInputField
            label="Password:"
            value={password}
            setValue={(v) => {
              setPassword(v);
              setPasswordError(null);
              setFormError(null);
            }}
            type="password"
            autoComplete="new-password"
          ></DataInputField>
          <DataInputField
            label="Password (Again):"
            value={secondPassword}
            setValue={(v) => {
              setSecondPassword(v);
              setPasswordError(null);
              setFormError(null);
            }}
            type="password"
            autoComplete="new-password"
          ></DataInputField>
          <StatusMessage type="error" message={passwordError} />
          <StatusMessage type="error" message={formError} />
          <AuthButton
            buttonText="Register"
            disabled={isSubmitting}
            onClick={async () => {
              setPasswordError(null);
              setEmailError(null);
              setFormError(null);

              const passwordErr = validatePassword();
              const emailErr = validateEmail();
              if (passwordErr != null) {
                setPasswordError(passwordErr);
                return;
              }
              if (emailErr != null) {
                setEmailError(emailErr);
                return;
              }

              setIsSubmitting(true);
              try {
                await register(username, email, password);
                navigate("/feed", { replace: true });
              } catch (err: unknown) {
                setFormError(getErrorMessage(err, "Registering failed!"));
                setIsSubmitting(false);
              }
            }}
          ></AuthButton>
          <Link to="/" className="auth-link">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
