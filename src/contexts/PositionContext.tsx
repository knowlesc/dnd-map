import { createContext, useState } from "react";
import { IPosition } from "../types/IPosition";

interface PositionContextValue {
  setPositions: React.Dispatch<IPosition[]>;
  positions: IPosition[];
}

export const PositionContext = createContext<PositionContextValue>(
  {} as PositionContextValue
);

export const PositionProvider: React.FC = ({ children }) => {
  const [positions, setPositions] = useState<IPosition[]>([]);

  return (
    <PositionContext.Provider
      value={{
        positions,
        setPositions,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};
