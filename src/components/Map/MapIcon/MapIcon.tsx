import { MouseEventHandler } from "react";
import { MapIconType } from "../../../lib/icons/icons";

export const iconSize = 30;

type Props = {
  icon: MapIconType;
  className?: string;
  onClick?: MouseEventHandler | undefined;
  size?: number;
};

export function MapIcon({ icon, className, onClick, size }: Props) {
  const iconName = icon.slice(5, icon.length);
  return (
    <svg
      className={`map-icon-${iconName} ${className}`}
      width={size ?? iconSize}
      height={size ?? iconSize}
      onClick={onClick}
    />
  );
}
