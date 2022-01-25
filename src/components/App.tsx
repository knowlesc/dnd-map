import * as React from "react";
import AppContext from "./AppContext/AppContext";
import { Route, Routes } from "react-router";
import { mapConfig } from "../config/mapConfig";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AppContext mapName={mapConfig[0].mapName} />}
        />
        {mapConfig.map(({ mapName, path }) => (
          <Route
            key={mapName}
            path={path}
            element={<AppContext mapName={mapName} />}
          />
        ))}
      </Routes>
    </>
  );
};

export default App;
