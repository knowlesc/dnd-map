import { Polyline, CircleMarker, Tooltip } from "react-leaflet";
import { LatLng } from "leaflet";
import { memo } from "react";

type Props = {
  positions: LatLng[];
  distance: string;
  distanceUnits: string;
};

const stringifyLatLng = (ll: LatLng) =>
  ll.lat.toString() + "," + ll.lng + ll.lat.toString();

export const RulerLines = memo(
  function RulerLines({ positions, distance, distanceUnits }: Props) {
    return (
      <>
        <Polyline
          className="stroke-white"
          positions={positions}
          dashArray={[8, 4]}
          weight={6}
          lineCap="square"
        />
        <Polyline
          className="stroke-neutral-800"
          positions={positions}
          dashArray={[8, 4]}
          weight={4}
          lineCap="butt"
        />
        {positions.map((point, i) => (
          <CircleMarker
            className="stroke-neutral-800 fill-white"
            key={i}
            center={point}
            radius={3}
            fill={true}
          >
            {i === positions.length - 1 && (
              <Tooltip permanent={true}>
                {distance} {distanceUnits}
              </Tooltip>
            )}
          </CircleMarker>
        ))}
      </>
    );
  },
  ({ positions: prev }, { positions: next }) =>
    prev.map(stringifyLatLng).join(";") === next.map(stringifyLatLng).join(";")
);
