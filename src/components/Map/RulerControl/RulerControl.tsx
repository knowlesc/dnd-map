import { useContext } from "react";
import { RulerContext } from "../../../contexts/RulerContext";
import { Button } from "../../Button/Button";
import { ConditionalIconText } from "../../ConditionalIconText/ConditionalIconText";

export function RulerControl() {
  const { startRuler, stopRuler, rulerMode } = useContext(RulerContext);

  return (
    <Button
      className={`${rulerMode ? "bg-blue-600 text-white" : ""}`}
      onClick={() => {
        rulerMode ? stopRuler() : startRuler();
      }}
    >
      <ConditionalIconText
        icon={rulerMode ? "times" : "ruler-combined"}
        text="Measure Distance"
      />
    </Button>
  );
}
