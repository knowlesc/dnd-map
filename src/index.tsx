import { createRoot } from "react-dom/client";
import "./index.scss";
import { App } from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./lib/FontAwesome";
import { StrictMode } from "react";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
