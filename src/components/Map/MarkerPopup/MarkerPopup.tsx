import { Popup } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useState } from "react";
import { MarkerInfo } from "./MarkerInfo";
import { MarkerForm } from "./MarkerForm";
import { Button } from "../../Button/Button";

export function MarkerPopup({ marker }: { marker: IMarker }) {
  const { canEditMarkers } = useContext(UserContext);
  const { removeMarker, setMarker } = useContext(MarkerContext);
  const [editing, setEditing] = useState(false);

  return (
    <Popup
      className="marker-popup"
      minWidth={180}
      closeButton={false}
      eventHandlers={{
        remove: () => {
          setEditing(false);
        },
      }}
    >
      <div className="mt-4 mb-4">
        {!editing && (
          <>
            <MarkerInfo marker={marker} />
            {canEditMarkers && (
              <div className="whitespace-nowrap flex justify-end mt-3">
                <Button
                  className="border-l-blue-400 border-l-2 bg-slate-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(true);
                  }}
                >
                  Edit Marker
                </Button>
              </div>
            )}
          </>
        )}

        {editing && (
          <MarkerForm
            marker={marker}
            onSaveClick={(updatedMarker) => {
              setMarker(updatedMarker);
              setEditing(false);
            }}
            onDeleteClick={() => removeMarker(marker)}
          />
        )}
      </div>
    </Popup>
  );
}
