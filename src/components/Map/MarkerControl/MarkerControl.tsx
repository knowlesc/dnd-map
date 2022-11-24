import { useMap } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import * as uuid from "uuid";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";
import { Button } from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export function MarkerControl() {
  const map = useMap();
  const { addMarker } = useContext(MarkerContext);
  const {
    user: { name },
  } = useContext(UserContext);

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control">
        <Button
          className="add-marker mt-11 lg:mt-12"
          onClick={() => {
            const center = map.getCenter();
            const marker: IMarker = {
              creator: name,
              id: uuid.v4(),
              lat: center.lat,
              lng: center.lng,
              name: "New Marker",
              color: Colors[0],
              icon: "icon-marker",
              dmOnly: true,
              radius: 0,
              notes: "",
              circle: false,
            };
            addMarker(marker);
          }}
        >
          <FontAwesomeIcon icon="map-marker-alt" className="mr-2" />
          New Marker
        </Button>
      </div>
    </div>
  );
}
