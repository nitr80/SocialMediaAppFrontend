import { useState } from "react";
import AuthButton from "../components/AuthButton";
import DataInputField from "../components/DataInputField";
import { useAuth } from "../hooks/useAuth";
import "./AuthPages.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAuth();

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
          ></DataInputField>
          <DataInputField
            label="Password:"
            value={password}
            setValue={setPassword}
          ></DataInputField>
          <AuthButton
            buttonText="Login"
            onClick={async () => {
              try {
                await login(username, password);
                navigate("/feed", {replace: true});
              } catch (err: any) {
                alert(err.response?.data?.message ?? "Login failed!");
              }
            }}
          ></AuthButton>
          <Link to="/register" className="auth-link">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
