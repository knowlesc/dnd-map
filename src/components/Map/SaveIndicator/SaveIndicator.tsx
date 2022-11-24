import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SaveContext } from "../../../contexts/SaveContext";

export function SaveIndicator() {
  const { saveError } = useContext(SaveContext);

  return (
    <>
      {saveError && (
        <div className="text-red-600 uppercase font-bold">
          <FontAwesomeIcon icon="exclamation-triangle" className="mr-1" />
          Save failed
        </div>
      )}
    </>
  );
}
