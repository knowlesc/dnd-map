import "./MarkerControl.scss";
import * as React from "react";
import { useMap } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import * as uuid from "uuid";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";

export const MarkerControl: React.FC = () => {
  const map = useMap();
  const { addMarker } = React.useContext(MarkerContext);
  const { email } = React.useContext(UserContext);

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control">
        <div className="marker-control">
          <button
            className="add-marker"
            onClick={() => {
              const center = map.getCenter();
              const marker: IMarker = {
                creator: email,
                id: uuid.v4(),
                lat: center.lat,
                lng: center.lng,
                name: "New Marker",
                color: Colors[0],
                icon: "map-marker-alt",
                dmOnly: true,
                type: "marker",
                radius: 0,
              };
              addMarker(marker);
            }}
          >
            New Marker
          </button>

          <button
            className="add-marker"
            onClick={() => {
              const center = map.getCenter();
              const marker: IMarker = {
                creator: email,
                id: uuid.v4(),
                lat: center.lat,
                lng: center.lng,
                name: "New Marker",
                color: Colors[0],
                icon: "map-marker-alt",
                dmOnly: true,
                type: "circle",
                radius: 100,
              };
              addMarker(marker);
            }}
          >
            New Circle
          </button>
        </div>
      </div>
    </div>
  );
};
