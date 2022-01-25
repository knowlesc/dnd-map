import "./AppLogo.scss";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { MapContext } from "../../contexts/MapContext";
import { SignInContext } from "../../contexts/SignInContext";
import { mapConfig } from "../../config/mapConfig";

export const AppLogo: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { displayName } = useContext(MapContext);
  const { user } = useContext(SignInContext);

  return (
    <>
      <div className="app-logo">
        {user && (
          <>
            <div
              className="app-logo-selector"
              onClick={() => setOpened(!opened)}
            >
              {displayName}{" "}
              <FontAwesomeIcon icon={opened ? "caret-up" : "caret-down"} />
            </div>
            <div className={"app-logo-dropdown" + (opened ? " opened" : "")}>
              <div className="app-logo-links">
                {mapConfig.map(({ mapName, path, displayName }) => (
                  <Link key={mapName} reloadDocument={true} to={path}>
                    <FontAwesomeIcon icon="map" /> {displayName}
                  </Link>
                ))}
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default AppLogo;
