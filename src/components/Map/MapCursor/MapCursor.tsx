import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { IPosition } from "../../../types/IPosition";
import { useRef } from "react";

export function MapCursor({ p }: { p: IPosition }) {
  const markerRef = useRef<any>(null);
  return (
    <Marker
      ref={markerRef}
      position={p.position}
      icon={divIcon({
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        className:
          "map-marker map-cursor transition-all duration-700 no-transition-on-zoom",
        html: renderToString(
          <div
            className={`${
              p.role === "dm"
                ? "drop-shadow-icon-big-gold"
                : "drop-shadow-icon-big"
            }`}
          >
            <i className="fas fa-mouse-pointer map-cursor-icon" />
            <span className="text-xs text-center font-bold font-fancy">
              {p.name}
            </span>
          </div>
        ),
      })}
    ></Marker>
  );
}
