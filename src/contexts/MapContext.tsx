import { createContext } from "react";
import { MapConfig, mapConfig } from "../config/mapConfig";

type MapContextValue = Omit<MapConfig, "imageUrl">;

export const MapContext = createContext<MapContextValue>({} as MapContextValue);

export function MapProvider({
  children,
  mapName,
}: React.PropsWithChildren<{ mapName: string }>) {
  const config = mapConfig.find((m) => mapName === m.mapName);
  if (!config) return null;

  const { displayName, scaleFactor, distanceUnits } = config;

  return (
    <MapContext.Provider
      value={{
        mapName,
        displayName,
        scaleFactor,
        distanceUnits,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
