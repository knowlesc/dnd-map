import "./LoginButtons.scss";
import * as React from "react";
import { SignInContext } from "../../contexts/SignInContext";

export const LoginButtons: React.FC = () => {
  const { signIn, signOut, user } = React.useContext(SignInContext);

  return (
    <div className="login-buttons">
      {!user && (
        <button className="dark" onClick={signIn}>
          Sign In with Google
        </button>
      )}
      {user && (
        <button className="dark" onClick={signOut}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default LoginButtons;
