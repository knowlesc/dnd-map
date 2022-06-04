import "./LoginButtons.scss";
import * as React from "react";
import { SignInContext } from "../../contexts/SignInContext";
import Button from "../Button/Button";

export const LoginButtons: React.FC = () => {
  const { signIn, signOut, googleAccount } = React.useContext(SignInContext);

  return (
    <div className="login-buttons">
      {!googleAccount && (
        <Button className="dark" onClick={signIn}>
          Sign In with Google
        </Button>
      )}
      {googleAccount && (
        <Button className="dark" onClick={signOut}>
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default LoginButtons;
