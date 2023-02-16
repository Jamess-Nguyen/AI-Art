import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername(username);
      setPassword(password);
    } catch (error) {
      alert(error.message);
    }
  };

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await FirebaseAuthService.registerUser(username, password);
      await FirebaseAuthService.loginUser(username, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const loginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert("missing username!");
      return;
    }
    try {
      await FirebaseAuthService.sendPaswordResetEmail(username);
      alert("Sent the Password Reset email");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="login-form-container">
      {props.existingUser ? (
        <div className="row">
          <h3>Welcome, {username}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              className="primary-button"
              onClick={handleSendResetPasswordEmail}
            >
              Reset Password
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={registerUser}
            >
              Register Account
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={loginWithGoogle}
            >
              Login with google
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
