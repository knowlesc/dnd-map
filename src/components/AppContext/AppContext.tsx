import * as React from "react";
import { MarkerProvider } from "../../contexts/MarkerContext";
import { SignInProvider } from "../../contexts/SignInContext";
import { SaveProvider } from "../../contexts/SaveContext";
import { UserProvider } from "../../contexts/UserContext";
import AppBody from "../AppBody/AppBody";
import AppHeader from "../AppHeader/AppHeader";
import { MapProvider } from "../../contexts/MapContext";

interface AppConfig {
  mapName: string;
}

export const AppContext: React.FC<AppConfig> = ({ mapName }) => {
  return (
    <>
      <SignInProvider>
        <MapProvider mapName={mapName}>
          <AppHeader />
          <UserProvider>
            <SaveProvider>
              <MarkerProvider>
                <AppBody />
              </MarkerProvider>
            </SaveProvider>
          </UserProvider>
        </MapProvider>
      </SignInProvider>
    </>
  );
};

export default AppContext;
