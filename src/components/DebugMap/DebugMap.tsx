import "./DebugMap.scss";
import * as React from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { MapContext } from "../../contexts/MapContext";

export const DebugMap: React.FC = () => {
  const map = useMap();
  const { sizeX, sizeY } = React.useContext(MapContext);
  const [zoom, setZoom] = React.useState(map.getZoom());

  React.useEffect(() => {
    map.on("zoom", () => {
      setZoom(map.getZoom());
    });
  });

  const bounds = map.getBounds();
  const sizeBounds = new LatLngBounds([0, 0], [sizeY, sizeX]);

  map.getSize();
  return (
    <div className="debug-map">
      <div>Bounds: {JSON.stringify(bounds)}</div>
      <div>Zoom: {zoom}</div>
      <div>Bounds Zoom: {map.getBoundsZoom(sizeBounds)}</div>
    </div>
  );
};

export default DebugMap;
