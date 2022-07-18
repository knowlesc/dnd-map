import * as React from "react";
import { Circle, Marker } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import {
  Circle as LeafletCircle,
  divIcon,
  Marker as LeafletMarker,
} from "leaflet";
import { renderToString } from "react-dom/server";
import MarkerPopup from "../MarkerPopup/MarkerPopup";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { iconSize, MapIcon } from "../MapIcon/MapIcon";

const truncateAfterChars = 45;

type Props = { marker: IMarker };

export const MapMarker = ({ marker }: Props) => {
  const { setMarker } = React.useContext(MarkerContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = React.useRef<LeafletMarker<any>>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circleRef = React.useRef<LeafletCircle<any>>(null);
  const { canEditMarkers } = React.useContext(UserContext);

  return (
    <Marker
      riseOnHover={true}
      ref={markerRef}
      key={marker.id}
      position={[marker.lat, marker.lng]}
      draggable={canEditMarkers}
      eventHandlers={{
        // TODO better way to do this?
        mouseover: () => {
          circleRef.current?.getElement()?.classList.add("stroke-4", "fill-30");
        },
        mouseout: () => {
          circleRef.current
            ?.getElement()
            ?.classList.remove("stroke-4", "fill-30");
        },
        dragend: () => {
          if (!markerRef.current) return;
          const { lat, lng } = markerRef.current.getLatLng();
          setMarker({ ...marker, lat, lng });
        },
      }}
      icon={divIcon({
        iconSize: [iconSize, iconSize],
        iconAnchor: [Math.round(iconSize / 2), iconSize],
        popupAnchor: [0, -iconSize],
        className: "font-fancy group",
        html: renderToString(
          <>
            <MapIcon
              icon={marker.icon}
              style={{ color: marker.color, fontSize: iconSize }}
              className="drop-shadow-icon-big"
            />
            <span
              className="group-hover:text-sm inline-block drop-shadow-icon-big text-xs text-center font-bold transition-all"
              // TODO not sure if there's a more "natural" way to do this
              style={{ width: "140px", marginLeft: "-55px" }}
            >
              {marker.dmOnly && <i className="fas fa-lock mr-1" />}
              {marker.name.length < truncateAfterChars
                ? marker.name
                : marker.name.slice(0, truncateAfterChars - 3) + "..."}
            </span>
          </>
        ),
      })}
    >
      {marker.circle && (
        <Circle
          className="map-marker-circle transition-all"
          ref={circleRef}
          key={marker.id}
          center={[marker.lat, marker.lng]}
          radius={marker.radius}
          pathOptions={{
            color: marker.color,
            fillColor: marker.color,
            dashArray: marker.dmOnly ? "10 10 10" : undefined,
          }}
        >
          <MarkerPopup marker={marker} />
        </Circle>
      )}
      <MarkerPopup marker={marker} />
    </Marker>
  );
};

export default MapMarker;
