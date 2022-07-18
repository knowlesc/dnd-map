import * as React from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { ImageContext } from "../../contexts/ImageContext";

export const DebugMap: React.FC = () => {
  const map = useMap();
  const { sizeX, sizeY } = React.useContext(ImageContext);
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
    <div className="absolute left-0 bottom-0 h-40 w-80 bg-white z-1000">
      <div>Bounds: {JSON.stringify(bounds)}</div>
      <div>Zoom: {zoom}</div>
      <div>Bounds Zoom: {map.getBoundsZoom(sizeBounds)}</div>
    </div>
  );
};

export default DebugMap;
