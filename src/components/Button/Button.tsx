import "./Button.scss";
import * as React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <button {...props} />;
};

export default Button;
