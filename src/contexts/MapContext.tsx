import { createContext } from "react";
import { mapConfig } from "../config/mapConfig";

type MapContextValue = {
  mapName: string;
  displayName: string;
};

export const MapContext = createContext<MapContextValue>({} as MapContextValue);

export const MapProvider: React.FC<{ mapName: string }> = ({
  children,
  mapName,
}) => {
  const config = mapConfig.find((m) => mapName === m.mapName);

  if (!config) return null;

  return (
    <MapContext.Provider value={{ mapName, displayName: config.displayName }}>
      {children}
    </MapContext.Provider>
  );
};
