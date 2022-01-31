import * as React from "react";
import { PositionContext } from "../../../contexts/PositionContext";
import { IPosition } from "../../../types/IPosition";
import MapCursor from "../MapCursor/MapCursor";

const CursorMemo = React.memo(
  ({ p }: { p: IPosition }) => <MapCursor p={p} />,
  ({ p: prev }, { p: next }) => {
    const isEqual =
      prev.map === next.map &&
      prev.name === next.name &&
      prev.position[0] === next.position[0] &&
      prev.position[1] === next.position[1];

    return isEqual;
  }
);

export const MousePositions: React.FC = () => {
  const { positions } = React.useContext(PositionContext);

  return (
    <>
      {positions?.map((position) => (
        <CursorMemo key={position.name} p={position} />
      ))}
    </>
  );
};

export default MousePositions;
