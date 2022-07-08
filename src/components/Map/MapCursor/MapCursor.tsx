import "./MapCursor.scss";
import * as React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { IPosition } from "../../../types/IPosition";

export const MapCursor: React.FC<{
  p: IPosition;
}> = ({ p }) => {
  const markerRef = React.useRef<any>(null);

  return (
    <Marker
      ref={markerRef}
      position={p.position}
      icon={divIcon({
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        className: `map-marker map-cursor ${
          p.role === "dm" ? "primary" : "secondary"
        }`,
        html: renderToString(
          <>
            <i className="fas fa-mouse-pointer map-cursor-icon" />
            <span className="map-marker-name">{p.name}</span>
          </>
        ),
      })}
    ></Marker>
  );
};

export default MapCursor;
