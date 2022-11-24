import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { mapConfig } from "../../config/mapConfig";
import { MapContext } from "../../contexts/MapContext";
import { SignInContext } from "../../contexts/SignInContext";
import { Button } from "../Button/Button";

export function MapMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const { displayName } = useContext(MapContext);
  const { signIn, signOut, googleAccount } = useContext(SignInContext);

  return (
    <>
      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control">
          {!showMenu && (
            <Button onClick={() => setShowMenu(true)}>
              {displayName}
              <FontAwesomeIcon className="ml-2" icon="bars" />
            </Button>
          )}
        </div>
      </div>

      {showMenu && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-1000">
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-40 bg-black" />
          <div className="absolute top-4 left-4 bottom-4 right-4 z-1000 rounded-sm drop-shadow-lg bg-white flex justify-center items-center">
            <div className="absolute right-1 top-1">
              <Button onClick={() => setShowMenu(false)}>
                <FontAwesomeIcon icon="times" />
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {mapConfig.map(({ mapName, displayName }) => (
                <Link
                  key={mapName}
                  to={`/${mapName}`}
                  className="block no-underline text-black"
                  onClick={() => setShowMenu(false)}
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
          </div>
        </div>
      )}
    </>
  );
}
