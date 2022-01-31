import * as React from "react";
import { ImageOverlay, useMap } from "react-leaflet";
import { ImageOverlay as LeafletImageOverlay, LatLngBounds } from "leaflet";
import MapMarker from "../MapMarker/MapMarker";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { MapContext } from "../../../contexts/MapContext";
import { PositionProvider } from "../../../contexts/PositionContext";
import MouseTracker from "../MouseTracker/MouseTracker";
import MousePositions from "../MousePositions/MousePositions";

export const MapInner: React.FC = () => {
  const { markers } = React.useContext(MarkerContext);
  const { imageUrl, sizeX, sizeY } = React.useContext(MapContext);
  const map = useMap();
  const ref = React.useRef<LeafletImageOverlay>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const newBounds = new LatLngBounds([0, 0], [sizeY, sizeX]);
    ref.current.setBounds(newBounds);
    map.setZoom(-1);
    map.fitBounds(newBounds);
    map.setMaxBounds(newBounds);
  }, [map, imageUrl, sizeX, sizeY]);

  return (
    <>
      <ImageOverlay
        ref={ref}
        bounds={[
          [0, 0],
          [sizeY, sizeX],
        ]}
        url={imageUrl}
      >
        {markers?.map((marker) => (
          <MapMarker key={marker.id} marker={marker} />
        ))}

        <PositionProvider>
          <MouseTracker />
          <MousePositions />
        </PositionProvider>
      </ImageOverlay>
    </>
  );
};

export default MapInner;
