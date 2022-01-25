import "./MapCircle.scss";
import * as React from "react";
import { Circle, Tooltip } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import MarkerPopup from "../MarkerPopup/MarkerPopup";
import { IMarker } from "../../../types/IMarker";

export const MapCircle: React.FC<{ marker: IMarker }> = ({ marker }) => {
  const { setMarker } = React.useContext(MarkerContext);
  const markerRef = React.useRef<any>(null);

  return (
    <Circle
      ref={markerRef}
      key={marker.id}
      center={[marker.lat, marker.lng]}
      radius={marker.radius}
      eventHandlers={{
        dragend: () => {
          if (!markerRef.current) return;
          const { lat, lng } = markerRef.current.getLatLng();
          setMarker({ ...marker, lat, lng });
        },
      }}
      pathOptions={{
        color: marker.color,
        fillColor: marker.color,
        dashArray: marker.dmOnly ? "10 10 10" : undefined,
      }}
    >
      <Tooltip direction="top" opacity={1}>
        <span>{marker.name}</span>
      </Tooltip>
      <MarkerPopup marker={marker} />
    </Circle>
  );
};

export default MapCircle;
