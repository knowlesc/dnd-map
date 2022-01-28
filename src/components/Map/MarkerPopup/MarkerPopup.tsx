import "./MarkerPopup.scss";
import * as React from "react";
import { Popup } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";
import { Icons } from "../../../constants/Icons";
import { MapContext } from "../../../contexts/MapContext";

function move(array: string[], current: string, amount: number) {
  const index = array.find((a) => a === current) ? array.indexOf(current) : -1;
  let newIndex = index + amount;

  if (newIndex === -1) newIndex = array.length - 1;
  if (newIndex === array.length) newIndex = 0;

  return array[newIndex];
}

export const MarkerPopup: React.FC<{ marker: IMarker }> = ({ marker }) => {
  const { canEditMarkers } = React.useContext(UserContext);
  const { removeMarker, setMarker } = React.useContext(MarkerContext);
  const [color, setColor] = React.useState(marker.color);
  const [icon, setIcon] = React.useState(marker.icon);
  const [name, setName] = React.useState(marker.name);
  const [notes, setNotes] = React.useState(marker.notes);
  const [dmOnly, setDmOnly] = React.useState(marker.dmOnly);
  const [lat, setLat] = React.useState(marker.lat);
  const [lng, setLng] = React.useState(marker.lng);
  const [radius, setRadius] = React.useState(marker.radius);
  const { sizeX, sizeY } = React.useContext(MapContext);

  const updateLat = React.useCallback(
    (value) => {
      const max = sizeY;
      setLat(Math.min(Math.max(value, 0), max));
    },
    [setLat, sizeY]
  );

  const updateLng = React.useCallback(
    (value) => {
      const max = sizeX;
      setLng(Math.min(Math.max(value, 0), max));
    },
    [setLng, sizeX]
  );

  const updateRadius = React.useCallback(
    (value) => {
      setRadius(Math.min(Math.max(value, 50), 1000));
    },
    [setRadius]
  );

  const updateColor = React.useCallback(
    (add) => {
      setColor(move(Colors, color, add));
    },
    [color]
  );

  const updateIcon = React.useCallback(
    (add) => {
      setIcon(move(Icons, icon, add));
    },
    [icon]
  );

  const save = React.useCallback(() => {
    if (marker.type === "circle") {
      // bug: passing lat/lng/radius to a non-circle will overwrite any dragging
      setMarker({
        ...marker,
        color,
        icon,
        name,
        dmOnly,
        notes,
        lat,
        lng,
        radius,
      });
    } else {
      setMarker({ ...marker, color, icon, name, dmOnly, notes });
    }
  }, [setMarker, marker, color, icon, name, dmOnly, lat, lng, radius, notes]);

  return (
    <Popup className="marker-popup" minWidth={150}>
      <div className="marker-popup-body">
        <div className="marker-popup-readonly">
          <strong>{!canEditMarkers && marker.name}</strong>
          {!canEditMarkers && (
            <div className="marker-notes">{marker.notes}</div>
          )}
        </div>

        {canEditMarkers && (
          <>
            <div className="marker-select-container">
              {marker.type !== "circle" && (
                <div className="marker-select">
                  <FontAwesomeIcon
                    className="arrow"
                    icon="chevron-left"
                    onClick={() => updateIcon(-1)}
                  />
                  <FontAwesomeIcon className="switch" icon={icon as IconProp} />
                  <FontAwesomeIcon
                    className="arrow"
                    icon="chevron-right"
                    onClick={() => updateIcon(1)}
                  />
                </div>
              )}
              <div className="marker-select">
                <FontAwesomeIcon
                  className="arrow"
                  icon="chevron-left"
                  onClick={() => updateColor(-1)}
                />
                <FontAwesomeIcon
                  className="switch"
                  icon="square"
                  color={color}
                />
                <FontAwesomeIcon
                  className="arrow"
                  icon="chevron-right"
                  onClick={() => updateColor(1)}
                />
              </div>
            </div>

            <input
              type="text"
              defaultValue={marker.name}
              onChange={(e) => setName(e.target.value)}
            />

            {marker.type === "circle" && (
              <div className="marker-popup-coords">
                <div>
                  X:
                  <br />
                  <input
                    type="number"
                    defaultValue={marker.lng}
                    onChange={(e) => updateLng(e.target.valueAsNumber)}
                  />
                </div>

                <div>
                  Y:
                  <br />
                  <input
                    type="number"
                    defaultValue={marker.lat}
                    onChange={(e) => updateLat(e.target.valueAsNumber)}
                  />
                </div>

                <div>
                  Radius:
                  <br />
                  <input
                    type="number"
                    defaultValue={marker.radius}
                    onChange={(e) => updateRadius(e.target.valueAsNumber)}
                  />
                </div>
              </div>
            )}

            <div className="marker-notes">
              <textarea
                placeholder="Notes"
                defaultValue={marker.notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="marker-checkbox">
              <label>
                <input
                  name="dmOnly"
                  type="checkbox"
                  defaultChecked={marker.dmOnly}
                  onChange={(e) => setDmOnly(e.target.checked)}
                />
                Visible to DM only
              </label>
            </div>

            <div className="marker-buttons">
              <button className="action sm" onClick={save}>
                save
              </button>
              <button className="warn sm" onClick={() => removeMarker(marker)}>
                delete
              </button>
            </div>
          </>
        )}
      </div>
    </Popup>
  );
};

export default MarkerPopup;
