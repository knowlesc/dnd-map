import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { ImageContext } from "../../contexts/ImageContext";
import { useContext, useEffect, useState } from "react";

declare global {
  interface Window {
    showDebugInfo(): void;
  }
}

export function DebugMap() {
  const map = useMap();
  const { sizeX, sizeY } = useContext(ImageContext);
  const [zoom, setZoom] = useState(map.getZoom());
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  useEffect(() => {
    window.showDebugInfo = () => setShowDebugInfo(true);
  });

  useEffect(() => {
    map.on("zoom", () => {
      if (showDebugInfo) setZoom(map.getZoom());
    });
  });

  if (!showDebugInfo) return null;

  const bounds = map.getBounds();
  const sizeBounds = new LatLngBounds([0, 0], [sizeY, sizeX]);

  map.getSize();
  return (
    <div className="absolute left-0 right-0 top-0 bg-white z-1000 text-xs font-mono whitespace-pre opacity-90">
      <div
        className="text-base font-bold font-sans absolute right-2 top-1 leading-none cursor-pointer"
        onClick={() => setShowDebugInfo(false)}
      >
        &times;
      </div>
      <div>Bounds: {JSON.stringify(bounds, null, "  ")}</div>
      <div>Zoom: {zoom}</div>
      <div>Bounds Zoom: {map.getBoundsZoom(sizeBounds)}</div>
    </div>
  );
}
