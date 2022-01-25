import "./MapBody.scss";
import * as React from "react";
import { MapContainer } from "react-leaflet";
import { CRS } from "leaflet";
import MapInner from "../MapInner/MapInner";
import { MarkerControl } from "../MarkerControl/MarkerControl";
import { SaveIndicator } from "../SaveIndicator/SaveIndicator";
import { UserContext } from "../../../contexts/UserContext";
import { MapContext } from "../../../contexts/MapContext";

export const MapBody: React.FC = () => {
  const { canEditMarkers } = React.useContext(UserContext);
  const { sizeX, sizeY } = React.useContext(MapContext);

  return (
    <MapContainer
      className="map-container"
      bounds={[
        [0, 0],
        [sizeY, sizeX],
      ]}
      crs={CRS.Simple}
      minZoom={-2}
      maxZoom={2}
      boundsOptions={{ padding: [0, 0] }}
      maxBounds={[
        [0, 0],
        [sizeY, sizeX],
      ]}
      whenCreated={(map) => map.setZoom(-1)}
    >
      <MapInner />
      {canEditMarkers && <SaveIndicator />}
      {canEditMarkers && <MarkerControl />}
    </MapContainer>
  );
};

export default MapContainer;
