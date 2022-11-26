import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { MarkerContext } from "../../contexts/MarkerContext";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "../Button/Button";
import { Linkify } from "../Linkify/Linkify";
import { MapIcon } from "../Map/MapIcon/MapIcon";

type Props = {
  onMarkerFocused: () => void;
};

export function MapSearch({ onMarkerFocused }: Props) {
  const { markers } = useContext(MarkerContext);
  const { canEditMarkers } = useContext(UserContext);
  const [filteredMarkers, setFilteredMarkers] = useState(markers);
  const [query, setQuery] = useState("");
  const map = useMap();

  useEffect(() => {
    if (!query) setFilteredMarkers(markers);
    const filtered = markers.filter((m) =>
      m.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredMarkers(filtered);
  }, [markers, query]);

  const onFocusMarker = useCallback(
    (lat: number, lng: number) => {
      map.flyTo([lat, lng], 1, {});
      onMarkerFocused();
    },
    [map]
  );

  return (
    <div className="flex flex-col gap-3 text-sm w-96 h-2/3 px-4">
      <input
        type="text"
        placeholder="Type to search markers"
        autoFocus
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="overflow-y-auto">
        {filteredMarkers.map(
          ({ icon, name, id, lat, lng, dmOnly, notes, dmNotes }) => (
            <div
              key={id}
              className="flex group flex-nowrap my-2 py-2 items-center w-full border-b-2"
            >
              <MapIcon
                className="group-hover:translate-y-0.5 transition-transform flex-shrink-0"
                icon={icon}
              />
              <div className="flex-grow-1 flex-shrink-1 ml-4">
                <span className="font-fancy italic font-semibold text-base">
                  {name}
                  {dmOnly && (
                    <FontAwesomeIcon icon="mask" className="text-xs ml-1" />
                  )}
                </span>
                <div className="text text-slate-600 whitespace-pre-line">
                  <Linkify text={notes} />
                </div>
                {canEditMarkers && (
                  <div className="text text-slate-600 whitespace-pre-line">
                    <Linkify text={dmNotes} />
                  </div>
                )}
              </div>
              <Button
                className="ml-auto flex-grow-1 flex-shrink-0 mr-2"
                onClick={() => onFocusMarker(lat, lng)}
              >
                <FontAwesomeIcon icon="compress-arrows-alt" />
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
