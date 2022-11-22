import { SignInContext } from "../../contexts/SignInContext";
import { Button } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export function LoginButtons() {
  const { signIn, signOut, googleAccount } = useContext(SignInContext);

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
}
