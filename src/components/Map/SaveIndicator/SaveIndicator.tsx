import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SaveContext } from "../../../contexts/SaveContext";

export function SaveIndicator() {
  const { saveError } = useContext(SaveContext);

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control">
        {saveError && (
          <div className="text-red-600 uppercase font-bold">
            <FontAwesomeIcon icon="exclamation-triangle" className="mr-1" />
            Save failed
          </div>
        )}
      </div>
    </div>
  );
}
