import "./AppLogo.scss";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContext } from "../../contexts/MapContext";
import { SignInContext } from "../../contexts/SignInContext";
import MapLinkList from "../MapLinkList/MapLinkList";

export const AppLogo: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { displayName } = useContext(MapContext);
  const { googleAccount } = useContext(SignInContext);

  return (
    <>
      <div className="app-logo">
        {googleAccount && displayName && (
          <>
            <div
              className="app-logo-selector"
              onClick={() => setOpened(!opened)}
            >
              {displayName}
              <FontAwesomeIcon
                icon={opened ? "angle-up" : "angle-down"}
                style={{ marginLeft: "15px" }}
              />
            </div>
            <div className={"app-logo-dropdown" + (opened ? " opened" : "")}>
              <div className="app-logo-links">
                <MapLinkList onClick={() => setOpened(false)} />
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default AppLogo;
