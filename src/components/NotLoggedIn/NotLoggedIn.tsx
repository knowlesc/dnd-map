import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SignInContext } from "../../contexts/SignInContext";
import { Button } from "../Button/Button";

export function NotLoggedIn() {
  const { signIn } = useContext(SignInContext);

  return (
    <main className="app-body bg-table-wood bg-cover text-center pt-10 flex justify-center">
      <Button onClick={signIn}>
        <FontAwesomeIcon icon="sign-in" className="mr-2" />
        Sign In with Google
      </Button>
    </main>
  );
}
