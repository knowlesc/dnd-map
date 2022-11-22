import { ImageOverlay, useMap } from "react-leaflet";
import { ImageOverlay as LeafletImageOverlay, LatLngBounds } from "leaflet";
import { MapMarker } from "../MapMarker/MapMarker";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { PositionProvider } from "../../../contexts/PositionContext";
import { MouseTracker } from "../MouseTracker/MouseTracker";
import { MousePositions } from "../MousePositions/MousePositions";
import { DEFAULT_ZOOM } from "../../../constants/Map";
import { ImageContext } from "../../../contexts/ImageContext";
import { RulerProvider } from "../../../contexts/RulerContext";
import { MapRuler } from "../MapRuler/MapRuler";
import { useContext, useRef, useEffect } from "react";

export function MapInner() {
  const { markers } = useContext(MarkerContext);
  const { imageUrl, sizeX, sizeY, loading } = useContext(ImageContext);

  const map = useMap();
  const ref = useRef<LeafletImageOverlay>(null);

  useEffect(() => {
    if (!ref.current || loading) return;
    const newBounds = new LatLngBounds([0, 0], [sizeY, sizeX]);
    ref.current.setBounds(newBounds);
    map.setZoom(DEFAULT_ZOOM);
    map.fitBounds(newBounds);
    map.setMaxBounds(newBounds);
  }, [map, sizeX, sizeY, loading]);

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

        <RulerProvider>
          <MapRuler />
        </RulerProvider>
      </ImageOverlay>
    </>
  );
}
