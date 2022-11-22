import { memo, useContext } from "react";
import { PositionContext } from "../../../contexts/PositionContext";
import { IPosition } from "../../../types/IPosition";
import { MapCursor } from "../MapCursor/MapCursor";

const CursorMemo = memo(
  function CursorMemo({ p }: { p: IPosition }) {
    return <MapCursor p={p} />;
  },
  ({ p: prev }, { p: next }) => {
    const isEqual =
      prev.map === next.map &&
      prev.name === next.name &&
      prev.position[0] === next.position[0] &&
      prev.position[1] === next.position[1];

    return isEqual;
  }
);

export function MousePositions() {
  const { positions } = useContext(PositionContext);

  return (
    <>
      {positions?.map((position) => (
        <CursorMemo key={position.name} p={position} />
      ))}
    </>
  );
}
