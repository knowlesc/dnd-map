import * as React from "react";

export const AppError: React.FC<{ error: string }> = ({ error }) => {
  return <main className="px-24 py-12 font-bold">{error}</main>;
};
