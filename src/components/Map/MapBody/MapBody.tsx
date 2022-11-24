import { MapContainer } from "react-leaflet";
import { CRS } from "leaflet";
import { MapInner } from "../MapInner/MapInner";
import { MAX_ZOOM, MIN_ZOOM } from "../../../constants/Map";
import { ImageContext } from "../../../contexts/ImageContext";
import { useContext } from "react";
import { MapTools } from "../../MapTools/MapTools";

export function MapBody() {
  const { sizeX, sizeY } = useContext(ImageContext);

  return (
    <MapContainer
      className="bg-table-wood bg-cover"
      bounds={[
        [0, 0],
        [sizeY, sizeX],
      ]}
      crs={CRS.Simple}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      zoomSnap={0}
      zoomDelta={0.5}
      boundsOptions={{ padding: [600, 600] }}
      maxBounds={[
        [0, 0],
        [sizeY, sizeX],
      ]}
      maxBoundsViscosity={1}
      zoomControl={false}
    >
      <MapInner />
      <MapTools />
    </MapContainer>
  );
}
