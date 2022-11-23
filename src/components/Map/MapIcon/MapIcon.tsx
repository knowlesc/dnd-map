import "./MapIcon.scss";
import { MouseEventHandler } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  icon: string | IconProp;
  className?: string;
  onClick?: MouseEventHandler | undefined;
};

export function MapIcon({ icon, className, onClick }: Props) {
  const iconName = (icon as string).slice(5, (icon as string).length);
  return (
    <svg
      className={`map-icon map-icon-${iconName} ${className}`}
      width={iconSize}
      height={iconSize}
      onClick={onClick}
    />
  );
}
