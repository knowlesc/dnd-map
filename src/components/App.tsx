import { AppContext } from "./AppContext/AppContext";
import { Route, Routes } from "react-router";
import { mapConfig } from "../config/mapConfig";
import { LandingPage } from "./LandingPage/LandingPage";
import { SignInProvider } from "../contexts/SignInContext";
import { HelmetProvider } from "react-helmet-async";

export function App() {
  return (
    <HelmetProvider>
      <SignInProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {mapConfig.map(({ mapName }) => (
            <Route
              key={mapName}
              path={`/${mapName}`}
              element={<AppContext mapName={mapName} />}
            />
          ))}
        </Routes>
      </SignInProvider>
    </HelmetProvider>
  );
}
