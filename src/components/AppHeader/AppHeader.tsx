import * as React from "react";
import LoginButtons from "../LoginButtons/LoginButtons";
import AppLogo from "../AppLogo/AppLogo";

export const AppHeader: React.FC = () => {
  return (
    <header className="app-header bg-neutral-900 h-20 flex justify-between flex-nowrap items-center">
      <AppLogo />
      <LoginButtons />
    </header>
  );
};

export default AppHeader;
