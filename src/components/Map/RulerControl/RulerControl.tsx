import { useContext } from "react";
import { RulerContext } from "../../../contexts/RulerContext";
import { Button } from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RulerControl() {
  const { startRuler, stopRuler, rulerMode } = useContext(RulerContext);

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control">
        <Button
          className={`${rulerMode ? "action" : ""}`}
          onClick={() => {
            rulerMode ? stopRuler() : startRuler();
          }}
        >
          <FontAwesomeIcon icon="ruler-combined" className="mr-2" />
          Distance
        </Button>
      </div>
    </div>
  );
}
