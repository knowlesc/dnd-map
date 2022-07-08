import * as React from "react";
import { MarkerProvider } from "../../contexts/MarkerContext";
import { SaveProvider } from "../../contexts/SaveContext";
import { UserProvider } from "../../contexts/UserContext";
import AppBody from "../AppBody/AppBody";
import AppHeader from "../AppHeader/AppHeader";
import { MapProvider } from "../../contexts/MapContext";
import { ImageProvider } from "../../contexts/ImageContext";

interface AppConfig {
  mapName: string;
}

export const AppContext: React.FC<AppConfig> = ({ mapName }) => {
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
};

export default AppContext;
