import { MarkerProvider } from "../../contexts/MarkerContext";
import { SaveProvider } from "../../contexts/SaveContext";
import { UserProvider } from "../../contexts/UserContext";
import { AppBody } from "../AppBody/AppBody";
import { AppHeader } from "../AppHeader/AppHeader";
import { MapProvider } from "../../contexts/MapContext";
import { ImageProvider } from "../../contexts/ImageContext";

interface AppConfig {
  mapName: string;
}

export function AppContext({ mapName }: AppConfig) {
  return (
    <>
      <MapProvider mapName={mapName}>
        <AppHeader />
        <UserProvider>
          <ImageProvider>
            <SaveProvider>
              <MarkerProvider>
                <AppBody />
              </MarkerProvider>
            </SaveProvider>
          </ImageProvider>
        </UserProvider>
      </MapProvider>
    </>
  );
}
