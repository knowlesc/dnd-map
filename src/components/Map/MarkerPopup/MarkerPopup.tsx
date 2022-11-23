import { Popup } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";
import { Button } from "../../Button/Button";
import { Icons, MapIcon } from "../MapIcon/MapIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useCallback } from "react";

function move(array: string[], current: string, amount: number) {
  const index = array.find((a) => a === current) ? array.indexOf(current) : -1;
  let newIndex = index + amount;

  if (newIndex === -1) newIndex = array.length - 1;
  if (newIndex === array.length) newIndex = 0;

  return array[newIndex];
}

export function MarkerPopup({ marker }: { marker: IMarker }) {
  const { canEditMarkers } = useContext(UserContext);
  const { removeMarker, setMarker } = useContext(MarkerContext);
  const [color, setColor] = useState(marker.color);
  const [icon, setIcon] = useState(marker.icon);
  const [iconSelecting, setIconSelecting] = useState(false);
  const [name, setName] = useState(marker.name);
  const [notes, setNotes] = useState(marker.notes ?? "");
  const [dmOnly, setDmOnly] = useState(marker.dmOnly);
  const [radius, setRadius] = useState(marker.radius);
  const [circle, setCircle] = useState(marker.circle ?? false);

  const updateRadius = useCallback(
    (value: number) => setRadius(Math.min(Math.max(value, 50), 1000)),
    [setRadius]
  );

  const updateColor = useCallback(
    (add: number) => setColor(move(Colors, color, add)),
    [color]
  );

  const save = useCallback(() => {
    setMarker({ ...marker, color, icon, name, dmOnly, notes, radius, circle });
  }, [setMarker, marker, color, icon, name, dmOnly, radius, notes, circle]);

  return (
    <Popup className="marker-popup" minWidth={150} closeButton={false}>
      <div className="mt-5 mb-4">
        {!canEditMarkers && (
          <div className="marker-popup-readonly text-sm">
            <strong>{marker.name}</strong>
            <div className="marker-notes">{marker.notes}</div>
          </div>
        )}

        {canEditMarkers && (
          <>
            <div className="flex items-center">
              <div className="cursor-pointer mr-2">
                <MapIcon
                  onClick={() => setIconSelecting((s) => !s)}
                  icon={icon as IconProp}
                />
              </div>
              <input
                className="w-full"
                type="text"
                defaultValue={marker.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {iconSelecting && (
              <div className="grid grid-cols-5 mt-2">
                {Icons.map((selectableIcon) => (
                  <div key={selectableIcon} className="text-center">
                    <MapIcon
                      className={`inline-block cursor-pointer ${
                        icon === selectableIcon ? "drop-shadow-highlight" : ""
                      }`}
                      icon={selectableIcon}
                      onClick={() => {
                        setIcon(selectableIcon);
                        setIconSelecting(false);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pr-2 mt-4">
              <div className="font-semibold text-sm">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={marker.circle}
                    onChange={(e) => setCircle(e.target.checked)}
                  />
                  Circle
                </label>
              </div>

              <div className="font-semibold text-sm">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={marker.dmOnly}
                    onChange={(e) => setDmOnly(e.target.checked)}
                  />
                  DM only
                </label>
              </div>
            </div>

            {circle && (
              <div className="mt-2 mb-4 text-sm">
                <div>Radius:</div>
                <div className="marker-popup-coords-input w-full flex">
                  <input
                    className="basis-1/2 w-full"
                    type="number"
                    step="10"
                    defaultValue={marker.radius}
                    onChange={(e) => updateRadius(e.target.valueAsNumber)}
                  />
                  <div className="basis-1/2 flex justify-around items-center text-xl">
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon="chevron-left"
                      onClick={() => updateColor(-1)}
                    />
                    <div
                      className="relative"
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    >
                      <div
                        className="absolute top-0 bottom-0 left-0 right-0"
                        style={{
                          borderRadius: 15,
                          borderWidth: 2,
                          borderStyle: "dashed",
                          borderColor: color,
                        }}
                      />
                      <div
                        className="absolute top-0 bottom-0 left-0 right-0"
                        style={{
                          background: color,
                          opacity: 0.5,
                          borderRadius: 15,
                        }}
                      />
                    </div>
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon="chevron-right"
                      onClick={() => updateColor(1)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="whitespace-pre-line mt-3">
              <textarea
                className="resize-none"
                placeholder="Notes"
                defaultValue={marker.notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="whitespace-nowrap flex justify-end mt-3">
              <Button className="bg-blue-400 text-white mr-2" onClick={save}>
                Save
              </Button>
              <Button
                className="bg-red-400 text-white"
                onClick={() => removeMarker(marker)}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </Popup>
  );
}
