import * as React from "react";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { LatLngTuple } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { useThrottleFn } from "react-use";
import { MapContext } from "../../../contexts/MapContext";
import { UserContext } from "../../../contexts/UserContext";
import { PositionContext } from "../../../contexts/PositionContext";
import { IPosition } from "../../../types/IPosition";

export const MouseTracker: React.FC = () => {
  const [position, setPosition] = React.useState<LatLngTuple | null>(null);
  const { user } = React.useContext(UserContext);
  const { mapName } = React.useContext(MapContext);
  const { setPositions } = React.useContext(PositionContext);

  const updatePosition = React.useCallback(
    (latlng: [number, number]) => {
      set(ref(getDatabase(), `/positions/${user.uid}`), {
        position: latlng,
        map: mapName,
        time: Date.now(),
        name: user.name,
      } as IPosition);
    },
    [mapName, user]
  );

  /**
   * Doing this here instead of up the component tree prevents re-rendering
   * things like map markers extremely frequently, which will cause them to
   * fly all over the place when zooming in and out.
   */
  React.useEffect(() => {
    onValue(ref(getDatabase(), `/positions`), (snapshot) => {
      const thirtySecondsAgo = Date.now() - 30 * 1000;
      const allPositions = (snapshot.val() as Record<string, IPosition>) ?? {};
      const relevantPositions = Object.entries(allPositions)
        .filter(
          ([uid, { map, time }]) =>
            uid !== user.uid && map === mapName && time > thirtySecondsAgo
        )
        .map(([, value]) => value);

      setPositions(relevantPositions);
    });
  }, [setPositions, user.uid, mapName]);

  useThrottleFn(
    (position) => {
      if (position) updatePosition(position);
    },
    500,
    [position]
  );

  useMapEvent("mousemove", (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  });

  useMapEvent("zoomstart", (e) => {
    document.getElementById("root")?.classList.add("zooming");
  });

  useMapEvent("zoomend", (e) => {
    document.getElementById("root")?.classList.remove("zooming");
  });

  return <></>;
};

export default MouseTracker;
