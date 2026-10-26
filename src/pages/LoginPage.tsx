import { useState } from "react";
import AuthButton from "../components/ui/AuthButton";
import DataInputField from "../components/ui/DataInputField";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils/errorUtils";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          <AuthButton
            buttonText="Login"
            onClick={async () => {
              try {
                await login(username, password);
                navigate("/feed", { replace: true });
              } catch (err: unknown) {
                alert(getErrorMessage(err, "Login failed!"));
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
