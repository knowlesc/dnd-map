import { IMarker } from "../../../types/IMarker";

export function MarkerInfo({ marker }: { marker: IMarker }) {
  return (
    <div className="text-sm">
      <strong>{marker.name}</strong>
      <div className="marker-notes">{marker.notes}</div>
    </div>
  );
}
