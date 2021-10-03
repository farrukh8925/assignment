import React, { ChangeEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
// Utils
import { register } from "../../utils/fetcher";
import { isTokenValid } from "../../utils/user";
// Import stylesheet
import "./style.css";

/**
 * Login screen component
 * Presents a name and an email field
 * The parameters are used to fetch an api token
 * Token validity 1hrs
 */
const LoginView: React.FC = () => {
  // Router hook
  const { push } = useHistory();

  // Local state management
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  /**
   * On Mount, check the local storage for a valid token.
   * If it exists in local storage and hasn't expired.
   * Navigate to dashboard.
   */
  React.useEffect(() => {
    if (isTokenValid()) {
      // redirect to the dashboard
      push("/dashboard");
    }
  }, [push]);

  /**
   * Perform the form submit action.
   * Send the information to the API.
   * Fetch API Token
   * Store in local storage
   * Redirect to dashboard.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(name, email);
    push("/dashboard");
  };

  /**
   * Manage input name change
   */
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  /**
   * Manage input email change
   */
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="login-view">
      <div className="login-view__container">
        <h1 className="no-top-margin">Login</h1>
        <form className="login-view__container--form" onSubmit={handleSubmit}>
          <label className="login-view__container--form--label">
            Name:
            <input
              data-testid="login-name"
              id="name"
              onChange={handleNameChange}
              required
              type="text"
              value={name}
            />
          </label>
          <label className="login-view__container--form--label">
            Email:
            <input
              data-testid="login-email"
              onChange={handleEmailChange}
              required
              type="email"
              value={email}
            />
          </label>
          <input type="submit" className="primary-button" />
        </form>
      </div>
    </div>
  );
};

LoginView.displayName = "LoginView";
export default LoginView;
