import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContext } from "../../contexts/MapContext";
import { SignInContext } from "../../contexts/SignInContext";
import { MapLinkList } from "../MapLinkList/MapLinkList";

export function AppLogo() {
  const [opened, setOpened] = useState(false);
  const { displayName } = useContext(MapContext);
  const { googleAccount } = useContext(SignInContext);

  return (
    <>
      {/* TODO remove app-logo class once responsive styles are gone */}
      <div className="app-logo text-neutral-200 font-semibold cursor-pointer">
        {googleAccount && displayName && (
          <>
            <div onClick={() => setOpened(!opened)}>
              {displayName}
              <FontAwesomeIcon
                className="ml-4"
                icon={opened ? "angle-up" : "angle-down"}
              />
            </div>
            <div
              className={
                "left-14 absolute bg-neutral-900 app-logo-dropdown origin-top shadow-lg z-1000 transition-all " +
                (opened ? "scale-y-100" : "scale-y-0")
              }
            >
              <MapLinkList onClick={() => setOpened(false)} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
