import "./MapIcon.scss";
import { IconName } from "@fortawesome/fontawesome-common-types";
import { CSSProperties, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  sizePx?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler | undefined;
  color?: string;
};

export const MapIcon: React.FC<Props> = ({
  icon,
  style,
  className,
  onClick,
  color,
}: Props) => {
  if ((icon as string).startsWith("icon-")) {
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

  // TODO remove this once icons are migrated
  return (
    <>
      <FontAwesomeIcon
        icon={icon as unknown as IconName}
        style={style}
        className={className}
        onClick={onClick}
        color={color}
      />
    </>
  );
};
