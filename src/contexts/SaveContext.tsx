import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import { IMarker } from "../types/IMarker";
import { MapContext } from "./MapContext";
import * as uuid from "uuid";

interface SaveContextValue {
  createMarker: (marker: IMarker) => void;
  deleteMarker: (marker: IMarker) => void;
  updateMarker: (marker: IMarker) => void;
  saving: boolean;
  saveError: string | null;
  savedMarkers: IMarker[];
  loading: boolean;
  loadError: string | null;
}

function getErrorMessage(e: unknown) {
  return (e as { message: string })?.message ?? "Unknown error";
}

export const SaveContext = createContext<SaveContextValue>(
  {} as SaveContextValue
);

export function SaveProvider({ children }: React.PropsWithChildren<{}>) {
  const { mapName } = useContext(MapContext);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    if (!mapName) return;

    onValue(
      ref(getDatabase(), `/markers/${mapName}`),
      (snapshot) => {
        if (loading) setLoading(false);
        if (loadError) setLoadError(null);
        setMarkers(Object.values(snapshot.val() ?? {}));
      },
      (error) => {
        setLoadError(error.message);
        console.error(error);
      }
    );
  }, [mapName, loading, loadError, setLoading, setLoadError, setMarkers]);

  const createMarker = useCallback(
    async (marker: IMarker) => {
      setSaveError(null);
      setSaving(true);
      const id = uuid.v4();

      try {
        await set(ref(getDatabase(), `/markers/${mapName}/${id}`), {
          ...marker,
          id,
        });
      } catch (e) {
        const message = getErrorMessage(e);
        setSaveError(message);
        console.error(message);
      } finally {
        setSaving(false);
      }
    },
    [mapName, setSaveError, setSaving]
  );

  const updateMarker = useCallback(
    async (marker: IMarker) => {
      setSaveError(null);
      setSaving(true);

      try {
        await set(ref(getDatabase(), `/markers/${mapName}/${marker.id}`), {
          ...marker,
        });
      } catch (e) {
        const message = getErrorMessage(e);
        setSaveError(message);
        console.error(message);
      } finally {
        setSaving(false);
      }
    },
    [mapName, setSaveError, setSaving]
  );

  const deleteMarker = useCallback(
    async (marker: IMarker) => {
      setSaveError(null);
      setSaving(true);

      try {
        await remove(ref(getDatabase(), `/markers/${mapName}/${marker.id}`));
      } catch (e) {
        const message = getErrorMessage(e);
        setSaveError(message);
        console.error(message);
      } finally {
        setSaving(false);
      }
    },
    [mapName, setSaveError, setSaving]
  );

  return (
    <SaveContext.Provider
      value={{
        saving,
        saveError,
        createMarker,
        updateMarker,
        deleteMarker,
        savedMarkers: markers,
        loading,
        loadError,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
}
