import "./MapMarker.scss";
import * as React from "react";
import { Marker } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { divIcon, Marker as LeafletMarker } from "leaflet";
import { renderToString } from "react-dom/server";
import MarkerPopup from "../MarkerPopup/MarkerPopup";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";

const truncateAfterChars = 30;

export const MapMarker: React.FC<{ marker: IMarker }> = ({ marker }) => {
  const { setMarker } = React.useContext(MarkerContext);
  const markerRef = React.useRef<LeafletMarker<any>>(null);
  const { canEditMarkers } = React.useContext(UserContext);

  return (
    <Marker
      ref={markerRef}
      key={marker.id}
      position={[marker.lat, marker.lng]}
      draggable={canEditMarkers}
      eventHandlers={{
        dragend: () => {
          if (!markerRef.current) return;
          const { lat, lng } = markerRef.current.getLatLng();
          setMarker({ ...marker, lat, lng });
        },
      }}
      icon={divIcon({
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        className: "map-marker",
        html: renderToString(
          <>
            <i
              style={{ color: marker.color }}
              className={`fas fa-${marker.icon} map-marker-icon`}
            />
            {marker.dmOnly && (
              <i className={`fas fa-lock map-marker-private`} />
            )}
            <span className="map-marker-name">
              {marker.name.length < truncateAfterChars
                ? marker.name
                : marker.name.slice(0, truncateAfterChars - 3) + "..."}
            </span>
          </>
        ),
      })}
    >
      <MarkerPopup marker={marker} />
    </Marker>
  );
};

export default MapMarker;
