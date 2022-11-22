import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { mapConfig } from "../../config/mapConfig";

type Props = {
  onClick?: () => void;
};

export function MapLinkList({ onClick }: Props) {
  return (
    <div className="grid grid-cols-[auto_max-content_auto] text-4xl font-semibold">
      <div></div>
      <div>
        {mapConfig.map(({ mapName, displayName }) => (
          <Link
            key={mapName}
            to={`/${mapName}`}
            className="map-link my-7 block px-10 text-neutral-200 no-underline"
            onClick={onClick}
          >
            <FontAwesomeIcon icon="map-location-dot" className="mr-3" />{" "}
            {displayName}
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
}
