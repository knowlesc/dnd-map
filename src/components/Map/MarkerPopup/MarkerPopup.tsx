import { Popup } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { MarkerInfo } from "./MarkerInfo";
import { MarkerForm } from "./MarkerForm";

export function MarkerPopup({ marker }: { marker: IMarker }) {
  const { canEditMarkers } = useContext(UserContext);
  const { removeMarker, setMarker } = useContext(MarkerContext);

  return (
    <Popup className="marker-popup" minWidth={150} closeButton={false}>
      <div className="mt-5 mb-4">
        {!canEditMarkers && <MarkerInfo marker={marker} />}

        {canEditMarkers && (
          <MarkerForm
            marker={marker}
            onSaveClick={(updatedMarker) => setMarker(updatedMarker)}
            onDeleteClick={() => removeMarker(marker)}
          />
        )}
      </div>
    </Popup>
  );
}
