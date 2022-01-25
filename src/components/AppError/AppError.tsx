import "./AppError.scss";
import * as React from "react";

export const AppError: React.FC<{ error: string }> = ({ error }) => {
  return <main className="app-error">{error}</main>;
};

export default AppError;
