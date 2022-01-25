import "./AppHeader.scss";
import * as React from "react";
import LoginButtons from "../LoginButtons/LoginButtons";
import AppLogo from "../AppLogo/AppLogo";

export const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <AppLogo />
      </div>
      <div className="app-header-right">
        <LoginButtons />
      </div>
    </header>
  );
};

export default AppHeader;
