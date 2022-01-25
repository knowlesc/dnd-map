import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./lib/FontAwesome";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
