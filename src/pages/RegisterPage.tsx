import { useState } from "react";
import AuthButton from "../components/AuthButton";
import DataInputField from "../components/DataInputField";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

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
            setValue={setUsername}
          ></DataInputField>
          <DataInputField
            label="Email:"
            value={email}
            setValue={setEmail}
          ></DataInputField>
          <DataInputField
            label="Password:"
            value={password}
            setValue={setPassword}
          ></DataInputField>
          <DataInputField
            label="Password (Again):"
            value={secondPassword}
            setValue={setSecondPassword}
          ></DataInputField>
          <AuthButton
            buttonText="Register"
            onClick={async () => {
              const passwordError = validatePassword();
              const emailError = validateEmail();
              if (passwordError != null) {
                alert(passwordError);
                return;
              }
              if (emailError != null) {
                alert(emailError);
                return;
              }
              try {
                await register(username, email, password);
                navigate("/feed", { replace: true });
              } catch (err: any) {
                alert(err.response?.data?.message ?? "Registering failed!");
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
