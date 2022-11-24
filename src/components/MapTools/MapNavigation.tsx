import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { mapConfig } from "../../config/mapConfig";
import { SignInContext } from "../../contexts/SignInContext";
import { Button } from "../Button/Button";

type Props = {
  onNavigation: () => void;
};

export function MapNavigation({ onNavigation }: Props) {
  const { signIn, signOut, googleAccount } = useContext(SignInContext);

  return (
    <div className="flex flex-col gap-3">
      {mapConfig.map(({ mapName, displayName }) => (
        <Link
          key={mapName}
          to={`/${mapName}`}
          className="block no-underline text-black"
          onClick={() => onNavigation()}
        >
          <Button>
            <FontAwesomeIcon icon="map-location-dot" className="mr-3" />{" "}
            {displayName}
          </Button>
        </Link>
      ))}
      <div className="login-buttons">
        {!googleAccount && (
          <Button onClick={signIn}>
            <FontAwesomeIcon icon="user" className="mr-2" />
            Sign In with Google
          </Button>
        )}
        {googleAccount && (
          <Button onClick={signOut}>
            <FontAwesomeIcon icon="user" className="mr-2" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}
