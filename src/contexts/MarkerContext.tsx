import { createContext, useCallback, useContext } from "react";
import { IMarker } from "../types/IMarker";
import { SaveContext } from "./SaveContext";
import { UserContext } from "./UserContext";

interface MarkerContextValue {
  addMarker: (marker: IMarker) => void;
  removeMarker: (marker: IMarker) => void;
  setMarker: (marker: IMarker) => void;
  markers: IMarker[];
}

export const MarkerContext = createContext<MarkerContextValue>(
  {} as MarkerContextValue
);

export function MarkerProvider({ children }: React.PropsWithChildren<{}>) {
  const { canEditMarkers } = useContext(UserContext);
  const { savedMarkers, deleteMarker, updateMarker, createMarker } =
    useContext(SaveContext);

  const addMarker = useCallback(
    (marker) => {
      if (!savedMarkers) return;
      createMarker(marker);
    },
    [createMarker, savedMarkers]
  );

  const removeMarker = useCallback(
    (marker) => {
      if (!savedMarkers) return;
      deleteMarker(marker);
    },
    [savedMarkers, deleteMarker]
  );

  const setMarker = useCallback(
    (marker: IMarker) => {
      if (!savedMarkers) return;
      updateMarker(marker);
    },
    [savedMarkers, updateMarker]
  );

  return (
    <MarkerContext.Provider
      value={{
        addMarker,
        removeMarker,
        setMarker,
        markers: canEditMarkers
          ? savedMarkers
          : savedMarkers.filter((m) => !m.dmOnly),
      }}
    >
      {children}
    </MarkerContext.Provider>
  );
}
