import { LatLng } from "leaflet";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MapContext } from "./MapContext";

interface RulerContextValue {
  addPoint: (latLng: LatLng) => void;
  rulerPoints: LatLng[];
  startRuler: () => void;
  stopRuler: () => void;
  rulerMode: boolean;
}

export const RulerContext = createContext<RulerContextValue>(
  {} as RulerContextValue
);

export const RulerProvider: React.FC = ({ children }) => {
  const [rulerMode, setRulerMode] = useState(false);
  const [rulerPoints, setRulerPoints] = useState<LatLng[]>([]);
  const { mapName } = useContext(MapContext);

  const addPoint = useCallback(
    (latLng: LatLng) => {
      setRulerPoints(rulerPoints.concat([latLng]));
    },
    [rulerMode, setRulerPoints, rulerPoints]
  );

  const startRuler = useCallback(() => {
    setRulerMode(true);
  }, [setRulerMode]);

  const stopRuler = useCallback(() => {
    setRulerPoints([]);
    setRulerMode(false);
  }, [setRulerMode]);

  useEffect(() => {
    stopRuler();
  }, [mapName]);

  return (
    <RulerContext.Provider
      value={{
        addPoint,
        startRuler,
        stopRuler,
        rulerPoints,
        rulerMode,
      }}
    >
      {children}
    </RulerContext.Provider>
  );
};
