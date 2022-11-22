import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./lib/FontAwesome";
import { StrictMode } from "react";

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
