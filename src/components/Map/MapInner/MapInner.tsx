import * as React from "react";
import { ImageOverlay } from "react-leaflet";
import MapMarker from "../MapMarker/MapMarker";
import { MarkerContext } from "../../../contexts/MarkerContext";
import MapCircle from "../MapCircle/MapCircle";
import { MapContext } from "../../../contexts/MapContext";
import { PositionProvider } from "../../../contexts/PositionContext";
import MouseTracker from "../MouseTracker/MouseTracker";
import MousePositions from "../MousePositions/MousePositions";

export const MapInner: React.FC = () => {
  const { markers } = React.useContext(MarkerContext);
  const { imageUrl, sizeX, sizeY } = React.useContext(MapContext);

  return (
    <>
      <ImageOverlay
        bounds={[
          [0, 0],
          [sizeY, sizeX],
        ]}
        url={imageUrl}
      >
        {markers?.map((marker) => {
          return marker.type === "circle" ? (
            <MapCircle key={marker.id} marker={marker} />
          ) : (
            <MapMarker key={marker.id} marker={marker} />
          );
        })}

        <PositionProvider>
          <MouseTracker />
          <MousePositions />
        </PositionProvider>
      </ImageOverlay>
    </>
  );
};

export default MapInner;
