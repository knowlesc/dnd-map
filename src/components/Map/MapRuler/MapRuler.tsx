import { useContext, useState } from "react";
import {
  Polyline,
  useMap,
  useMapEvent,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { LatLng, Map } from "leaflet";
import { RulerContext } from "../../../contexts/RulerContext";
import { MapContext } from "../../../contexts/MapContext";
import { RulerControl } from "../RulerControl/RulerControl";

function calculateDistance(
  map: Map,
  rulerPoints: LatLng[],
  scaleFactor: number
) {
  const distance = rulerPoints
    .reduce((acc, _, i) => {
      if (i < rulerPoints.length - 1) {
        acc += scaleFactor * map.distance(rulerPoints[i], rulerPoints[i + 1]);
      }

      return acc;
    }, 0)
    .toFixed(0);

  return distance;
}

export function MapRuler() {
  const [mousePosition, setMousePosition] = useState<LatLng | null>(null);
  const [showMouse, setShowMouse] = useState(true);
  const { addPoint, rulerPoints, rulerMode } = useContext(RulerContext);
  const { scaleFactor, distanceUnits } = useContext(MapContext);
  const map = useMap();

  useMapEvent("mousemove", (e) => {
    if (rulerMode) {
      setMousePosition(e.latlng);
    }
  });

  useMapEvent("preclick", (e) => {
    if (rulerMode) {
      addPoint(e.latlng);
      setShowMouse(true);
    }
  });

  useMapEvent("keyup", (e) => {
    if (rulerMode && e.originalEvent.key === "Escape") {
      setShowMouse(false);
    }
  });

  if (!scaleFactor || !distanceUnits) return null;

  if (!rulerMode || !mousePosition) return <RulerControl />;

  const positions = rulerPoints.concat(showMouse ? [mousePosition] : []);
  const distance = calculateDistance(map, positions, scaleFactor);

  return (
    <>
      <RulerControl />

      <Polyline
        className="stroke-white"
        positions={positions}
        dashArray={[8, 4]}
        weight={6}
        lineCap="square"
      />
      <Polyline
        className="stroke-neutral-800"
        positions={positions}
        dashArray={[8, 4]}
        weight={4}
        lineCap="butt"
      />

      {positions.map((point, i) => (
        <CircleMarker
          className="stroke-neutral-800 fill-white"
          key={i}
          center={point}
          radius={3}
          fill={true}
        >
          {i === positions.length - 1 && (
            <Tooltip permanent={true}>
              {distance} {distanceUnits}
            </Tooltip>
          )}
        </CircleMarker>
      ))}
    </>
  );
}
