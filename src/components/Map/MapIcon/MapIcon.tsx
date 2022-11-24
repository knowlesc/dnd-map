import "./MapIcon.scss";
import { MouseEventHandler } from "react";

export const Icons: string[] = [
  "icon-castle",
  "icon-beer",
  "icon-tree",
  "icon-shield",
  "icon-bed",
  "icon-house",
  "icon-landmark",
  "icon-signpost",
  "icon-trail",
  "icon-marker",
  "icon-marker-red",
  "icon-religion",
  "icon-shop",
  "icon-magic-shop",
  "icon-book-shop",
  "icon-camp",
  "icon-smith",
  "icon-flag",
  "icon-skull",
  "icon-dragon",
  "icon-combat",
  "icon-hall",
  "icon-animal",
  "icon-treasure",
  "icon-magic",
  "icon-bow",
  "icon-cave",
];
export const iconSize = 30;

type Props = {
  icon: string;
  className?: string;
  onClick?: MouseEventHandler | undefined;
  size?: number;
};

export function MapIcon({ icon, className, onClick, size }: Props) {
  const iconName = (icon as string).slice(5, (icon as string).length);
  return (
    <svg
      className={`map-icon map-icon-${iconName} ${className}`}
      width={size ?? iconSize}
      height={size ?? iconSize}
      onClick={onClick}
    />
  );
}
