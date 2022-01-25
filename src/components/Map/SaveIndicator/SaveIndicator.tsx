import "./SaveIndicator.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { SaveContext } from "../../../contexts/SaveContext";

export const SaveIndicator: React.FC = () => {
  const { saving, saveError } = useContext(SaveContext);

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control">
        {saving && (
          <div className="save-indicator">
            <FontAwesomeIcon icon="save" className="rotate" />
            Saving...
          </div>
        )}
        {saveError && (
          <div className="save-indicator save-error">
            <FontAwesomeIcon icon="exclamation-triangle" />
            Save failed
          </div>
        )}
      </div>
    </div>
  );
};
