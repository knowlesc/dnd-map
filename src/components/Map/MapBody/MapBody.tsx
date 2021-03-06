import "./MapBody.scss";
import * as React from "react";
import { MapContainer } from "react-leaflet";
import { CRS } from "leaflet";
import MapInner from "../MapInner/MapInner";
import { MarkerControl } from "../MarkerControl/MarkerControl";
import { SaveIndicator } from "../SaveIndicator/SaveIndicator";
import { UserContext } from "../../../contexts/UserContext";
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from "../../../constants/Map";
import { DEBUG } from "../../../config/debugConfig";
import DebugMap from "../../DebugMap/DebugMap";
import { ImageContext } from "../../../contexts/ImageContext";

export const MapBody: React.FC = () => {
  const { canEditMarkers } = React.useContext(UserContext);
  const { sizeX, sizeY } = React.useContext(ImageContext);

  return (
    <MapContainer
      className="map-container"
      wheelPxPerZoomLevel={150}
      bounds={[
        [0, 0],
        [sizeY, sizeX],
      ]}
      crs={CRS.Simple}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      zoomSnap={0.5}
      zoomDelta={0.5}
      boundsOptions={{ padding: [600, 600] }}
      maxBounds={[
        [0, 0],
        [sizeY, sizeX],
      ]}
      maxBoundsViscosity={1}
      whenCreated={(map) => map.setZoom(DEFAULT_ZOOM)}
    >
      <MapInner />
      {canEditMarkers && <SaveIndicator />}
      {canEditMarkers && <MarkerControl />}
      {DEBUG && <DebugMap />}
    </MapContainer>
  );
};

export default MapContainer;
