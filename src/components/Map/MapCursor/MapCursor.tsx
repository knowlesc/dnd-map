import * as React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { IPosition } from "../../../types/IPosition";

export const MapCursor: React.FC<{
  p: IPosition;
}> = ({ p }) => {
  const markerRef = React.useRef<any>(null);
  console.log(p.role);

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
};
