import { useContext, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { LatLng, Map } from "leaflet";
import { RulerContext } from "../../../contexts/RulerContext";
import { MapContext } from "../../../contexts/MapContext";
import { RulerLines } from "./RulerLines";

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

  if (!scaleFactor || !distanceUnits || !rulerMode || !mousePosition)
    return null;

  const positions = rulerPoints.concat(showMouse ? [mousePosition] : []);
  const distance = calculateDistance(map, positions, scaleFactor);

  return <RulerLines {...{ positions, distance, distanceUnits }} />;
}
