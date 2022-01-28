import "./MapCursor.scss";
import * as React from "react";
import { Marker } from "react-leaflet";
import { divIcon, LatLngTuple } from "leaflet";
import { renderToString } from "react-dom/server";

export const MapCursor: React.FC<{
  p: { name: string; position: LatLngTuple };
}> = ({ p }) => {
  const markerRef = React.useRef<any>(null);

  return (
    <Marker
      ref={markerRef}
      position={p.position}
      icon={divIcon({
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        className: "map-marker map-cursor",
        html: renderToString(
          <>
            <i className={`fas fa-mouse-pointer map-cursor-icon`} />
            <span className="map-marker-name">{p.name}</span>
          </>
        ),
      })}
    ></Marker>
  );
};

export default MapCursor;
