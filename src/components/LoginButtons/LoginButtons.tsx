import * as React from "react";
import { SignInContext } from "../../contexts/SignInContext";
import { Button } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoginButtons: React.FC = () => {
  const { signIn, signOut, googleAccount } = React.useContext(SignInContext);

  return (
    <div className="login-buttons">
      {!googleAccount && (
        <Button className="dark" onClick={signIn}>
          <FontAwesomeIcon icon="user" style={{ marginRight: "10px" }} />
          Sign In with Google
        </Button>
      )}
      {googleAccount && (
        <Button className="dark" onClick={signOut}>
          <FontAwesomeIcon icon="user" style={{ marginRight: "10px" }} />
          Sign Out
        </Button>
      )}
    </div>
  );
};
