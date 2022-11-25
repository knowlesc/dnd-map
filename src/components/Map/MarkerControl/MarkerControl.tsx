import { useMap } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import * as uuid from "uuid";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";
import { Button } from "../../Button/Button";
import { useContext } from "react";
import { ConditionalIconText } from "../../ConditionalIconText/ConditionalIconText";

export function MarkerControl() {
  const map = useMap();
  const { addMarker } = useContext(MarkerContext);
  const {
    user: { name },
  } = useContext(UserContext);

  return (
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
          icon: "icon-marker",
          dmOnly: true,
          radius: 0,
          notes: "",
          dmNotes: "",
          circle: false,
        };
        addMarker(marker);
      }}
    >
      <ConditionalIconText icon="map-marker-alt" text="New Marker" />
    </Button>
  );
}
