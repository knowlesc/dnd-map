import { Popup } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { useContext, useState } from "react";
import { MarkerInfo } from "./MarkerInfo";
import { MarkerForm } from "./MarkerForm";
import { Button } from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  marker: IMarker;
  startMove: () => void;
  stopMove: () => void;
};

export function MarkerPopup({ marker, startMove, stopMove }: Props) {
  const { canEditMarkers } = useContext(UserContext);
  const { removeMarker, setMarker } = useContext(MarkerContext);
  const [editing, setEditing] = useState(false);
  const [dragging, setDragging] = useState(false);

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
                {dragging ? (
                  <Button
                    className="bg-blue-600 text-white mr-2"
                    onClick={() => {
                      setDragging(false);
                      stopMove();
                    }}
                  >
                    <FontAwesomeIcon
                      icon="up-down-left-right"
                      className="mr-2"
                    />{" "}
                    Done
                  </Button>
                ) : (
                  <Button
                    className="bg-slate-200 mr-2"
                    onClick={() => {
                      setDragging(true);
                      startMove();
                    }}
                  >
                    <FontAwesomeIcon
                      icon="up-down-left-right"
                      className="mr-2"
                    />{" "}
                    Move
                  </Button>
                )}

                <Button
                  className="bg-slate-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(true);
                  }}
                >
                  <FontAwesomeIcon icon="pencil" className="mr-2" /> Edit
                  Details
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
