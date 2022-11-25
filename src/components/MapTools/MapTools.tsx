import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { MapContext } from "../../contexts/MapContext";
import { RulerProvider } from "../../contexts/RulerContext";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "../Button/Button";
import { ConditionalIconText } from "../ConditionalIconText/ConditionalIconText";
import { DebugMap } from "../DebugMap/DebugMap";
import { MapRuler } from "../Map/MapRuler/MapRuler";
import { MarkerControl } from "../Map/MarkerControl/MarkerControl";
import { SaveIndicator } from "../Map/SaveIndicator/SaveIndicator";
import { MapNavigation } from "./MapNavigation";
import { MapOverlay } from "./MapOverlay";
import { MapSearch } from "./MapSearch";

export function MapTools() {
  const { canEditMarkers } = useContext(UserContext);
  const { displayName } = useContext(MapContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const appBody = document.getElementById("app-body");

  /**
   * Render controls outside of leaflet container to avoid interaction
   * conflicts between the map and the tools
   */
  return createPortal(
    <>
      <div className="fixed right-4 bottom-4 left-4 justify-end flex flex-wrap gap-2 z-1000">
        {canEditMarkers && <SaveIndicator />}
        {canEditMarkers && <MarkerControl />}

        <RulerProvider>
          <MapRuler />
        </RulerProvider>

        <Button onClick={() => setShowSearch(true)}>
          <ConditionalIconText icon="search" text="Find Marker" />
        </Button>

        <Button onClick={() => setShowMenu(true)}>
          {displayName}
          <FontAwesomeIcon className="ml-2" icon="bars" />
        </Button>
      </div>

      <DebugMap />

      {showMenu && (
        <MapOverlay onClose={() => setShowMenu(false)}>
          <MapNavigation onNavigation={() => setShowMenu(false)} />
        </MapOverlay>
      )}

      {showSearch && (
        <MapOverlay onClose={() => setShowSearch(false)}>
          <MapSearch onMarkerFocused={() => setShowSearch(false)} />
        </MapOverlay>
      )}
    </>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    appBody!
  );
}
