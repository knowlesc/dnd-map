import * as React from "react";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { LatLngTuple } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { useThrottleFn } from "react-use";
import { MapContext } from "../../../contexts/MapContext";
import { UserContext } from "../../../contexts/UserContext";
import { PositionContext } from "../../../contexts/PositionContext";
import {
  deserializePosition,
  serializePosition,
} from "../../../types/IPosition";

export function MouseTracker() {
  const [position, setPosition] = React.useState<LatLngTuple | null>(null);
  const { user, users } = React.useContext(UserContext);
  const { mapName } = React.useContext(MapContext);
  const { setPositions } = React.useContext(PositionContext);

  const updatePosition = React.useCallback(
    (latlng: [number, number]) => {
      set(ref(getDatabase(), `/xy/${user.uid}`), {
        p: serializePosition({
          position: latlng,
          map: mapName,
          time: Date.now(),
          name: user.name,
          role: user.role,
        }),
      }).catch(console.error);
    },
    [mapName, user]
  );

  /**
   * Doing this here instead of up the component tree prevents re-rendering
   * things like map markers extremely frequently, which will cause them to
   * fly all over the place when zooming in and out.
   */
  React.useEffect(() => {
    const cancel = onValue(
      ref(getDatabase(), "/xy"),
      (snapshot) => {
        const thirtySecondsAgo = Date.now() - 30 * 1000;
        const allPositions =
          (snapshot.val() as Record<string, { p: string }>) ?? {};
        const relevantPositions = Object.entries(allPositions)
          .filter(([uid]) => uid !== user.uid)
          .map(([uid, { p }]) => deserializePosition(p, users[uid]))
          .filter(
            ({ map, time }) => map === mapName && time > thirtySecondsAgo
          );

        setPositions(relevantPositions);
      },
      console.error
    );

    return () => cancel();
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

  useMapEvent("zoomstart", () => {
    document.getElementById("root")?.classList.add("zooming");
  });

  useMapEvent("zoomend", () => {
    document.getElementById("root")?.classList.remove("zooming");
  });

  return <></>;
}
