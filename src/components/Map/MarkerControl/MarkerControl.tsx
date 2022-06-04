import "./MarkerControl.scss";
import * as React from "react";
import { useMap } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import * as uuid from "uuid";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";
import Button from "../../Button/Button";

export const MarkerControl: React.FC = () => {
  const map = useMap();
  const { addMarker } = React.useContext(MarkerContext);
  const {
    user: { name },
  } = React.useContext(UserContext);

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control">
        <div className="marker-control">
          <Button
            className="add-marker"
            onClick={() => {
              const center = map.getCenter();
              const marker: IMarker = {
                creator: name,
                id: uuid.v4(),
                lat: center.lat,
                lng: center.lng,
                name: "New Marker",
                color: Colors[0],
                icon: "map-marker-alt",
                dmOnly: true,
                radius: 0,
                notes: "",
                circle: false,
              };
              addMarker(marker);
            }}
          >
            New Marker
          </Button>
        </div>
      </div>
    </div>
  );
};
