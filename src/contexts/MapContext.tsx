import { createContext } from "react";
import { MapConfig, mapConfig } from "../config/mapConfig";

type MapContextValue = MapConfig;

export const MapContext = createContext<MapContextValue>({} as MapContextValue);

export const MapProvider: React.FC<{ mapName: string }> = ({
  children,
  mapName,
}) => {
  const config = mapConfig.find((m) => mapName === m.mapName);

  if (!config) return null;

  return (
    <MapContext.Provider value={{ ...config }}>{children}</MapContext.Provider>
  );
};
