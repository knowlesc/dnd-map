import "./MapLinkList.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { mapConfig } from "../../config/mapConfig";

type Props = {
  onClick?: () => void;
};

export const MapLinkList: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="map-link-list">
      <div></div>
      <div>
        {mapConfig.map(({ mapName, displayName }) => (
          <Link
            key={mapName}
            to={`/${mapName}`}
            className="map-link"
            onClick={onClick}
          >
            <FontAwesomeIcon icon="map-location-dot" /> {displayName}
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default MapLinkList;
