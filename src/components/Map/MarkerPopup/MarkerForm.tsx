import { IMarker } from "../../../types/IMarker";
import { Colors } from "../../../constants/Colors";
import { Button } from "../../Button/Button";
import { Icons, MapIcon } from "../MapIcon/MapIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";

function move(array: string[], current: string, amount: number) {
  const index = array.find((a) => a === current) ? array.indexOf(current) : -1;
  let newIndex = index + amount;

  if (newIndex === -1) newIndex = array.length - 1;
  if (newIndex === array.length) newIndex = 0;

  return array[newIndex];
}

type Props = {
  marker: IMarker;
  onSaveClick: (marker: IMarker) => void;
  onDeleteClick: () => void;
};

export function MarkerForm({ marker, onSaveClick, onDeleteClick }: Props) {
  const [color, setColor] = useState(marker.color);
  const [icon, setIcon] = useState(marker.icon);
  const [iconSelecting, setIconSelecting] = useState(false);
  const [name, setName] = useState(marker.name);
  const [notes, setNotes] = useState(marker.notes ?? "");
  const [dmNotes, setDmNotes] = useState(marker.dmNotes ?? "");
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
    onSaveClick({
      ...marker,
      color,
      icon,
      name,
      dmOnly,
      notes,
      dmNotes,
      radius,
      circle,
    });
  }, [
    onSaveClick,
    marker,
    color,
    icon,
    name,
    dmOnly,
    radius,
    notes,
    dmNotes,
    circle,
  ]);

  return (
    <>
      <div className="flex items-center">
        <div className="cursor-pointer mr-2">
          <MapIcon onClick={() => setIconSelecting((s) => !s)} icon={icon} />
        </div>
        <input
          className="w-full"
          type="text"
          defaultValue={marker.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {iconSelecting && (
        <div className="grid grid-cols-6 mt-2">
          {Icons.map((selectableIcon) => (
            <Button
              key={selectableIcon}
              className={`px-0 py-0 h-9 w-full flex items-center justify-center ${
                icon === selectableIcon ? "bg-blue-300" : ""
              }`}
              onClick={(e) => {
                setIcon(selectableIcon);
                setIconSelecting(false);
                e.stopPropagation(); // Otherwise the popup closes
              }}
            >
              <MapIcon size={24} className={""} icon={selectableIcon} />
            </Button>
          ))}
        </div>
      )}

      <div className="flex justify-between pr-2 mt-4">
        <div className="font-condensed text-sm">
          <label>
            <input
              type="checkbox"
              defaultChecked={marker.circle}
              onChange={(e) => setCircle(e.target.checked)}
            />
            Area
          </label>
        </div>

        <div className="font-condensed text-sm">
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
          placeholder="Notes (Public)"
          defaultValue={marker.notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="whitespace-pre-line mt-3 relative">
        <textarea
          className="resize-none"
          placeholder="Notes (Private)"
          defaultValue={marker.dmNotes}
          onChange={(e) => setDmNotes(e.target.value)}
        ></textarea>
        <FontAwesomeIcon icon="mask" className="absolute bottom-1 right-1" />
      </div>

      <div className="whitespace-nowrap flex justify-end mt-3">
        <Button
          className="border-l-blue-600 border-l-2 mr-2 bg-slate-200"
          onClick={(e) => {
            e.stopPropagation(); // Otherwise the popup closes
            save();
          }}
        >
          Save
        </Button>
        <Button
          className="border-l-red-400 border-l-2 bg-slate-200"
          onClick={onDeleteClick}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
