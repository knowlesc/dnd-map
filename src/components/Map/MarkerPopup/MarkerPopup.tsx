import "./MarkerPopup.scss";
import * as React from "react";
import { Popup } from "react-leaflet";
import { MarkerContext } from "../../../contexts/MarkerContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IMarker } from "../../../types/IMarker";
import { UserContext } from "../../../contexts/UserContext";
import { Colors } from "../../../constants/Colors";
import Button from "../../Button/Button";
import { Icons, MapIcon } from "../MapIcon/MapIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [iconSelecting, setIconSelecting] = React.useState(false);
  const [name, setName] = React.useState(marker.name);
  const [notes, setNotes] = React.useState(marker.notes ?? "");
  const [dmOnly, setDmOnly] = React.useState(marker.dmOnly);
  const [radius, setRadius] = React.useState(marker.radius);
  const [circle, setCircle] = React.useState(marker.circle ?? false);

  const updateRadius = React.useCallback(
    (value) => setRadius(Math.min(Math.max(value, 50), 1000)),
    [setRadius]
  );

  const updateColor = React.useCallback(
    (add) => setColor(move(Colors, color, add)),
    [color]
  );

  const save = React.useCallback(() => {
    setMarker({ ...marker, color, icon, name, dmOnly, notes, radius, circle });
  }, [setMarker, marker, color, icon, name, dmOnly, radius, notes, circle]);

  return (
    <Popup className="marker-popup" minWidth={150}>
      <div className="marker-popup-body">
        {!canEditMarkers && (
          <div className="marker-popup-readonly">
            <strong>{marker.name}</strong>
            <div className="marker-notes">{marker.notes}</div>
          </div>
        )}

        {canEditMarkers && (
          <>
            <div className="marker-details">
              <div className="marker-select">
                <MapIcon
                  onClick={() => setIconSelecting((s) => !s)}
                  icon={icon as IconProp}
                />
              </div>
              <input
                type="text"
                defaultValue={marker.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {iconSelecting && (
              <div className="marker-select-icon">
                {Icons.map((selectableIcon) => (
                  <div key={selectableIcon}>
                    <MapIcon
                      className={`cursor-pointer ${
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

            <div className="marker-checkbox-container">
              <div className="marker-checkbox">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={marker.circle}
                    onChange={(e) => setCircle(e.target.checked)}
                  />
                  Circle
                </label>
              </div>

              <div className="marker-checkbox">
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
              <div className="marker-popup-coords">
                <div>
                  Radius:
                  <div className="marker-popup-coords-input">
                    <input
                      type="number"
                      defaultValue={marker.radius}
                      onChange={(e) => updateRadius(e.target.valueAsNumber)}
                    />
                    <div>
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon="caret-left"
                        onClick={() => updateColor(-1)}
                      />
                      <MapIcon icon="square" color={color} />
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon="caret-right"
                        onClick={() => updateColor(1)}
                      />
                    </div>
                  </div>
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

            <div className="marker-buttons">
              <Button className="action sm" onClick={save}>
                save
              </Button>
              <Button className="warn sm" onClick={() => removeMarker(marker)}>
                delete
              </Button>
            </div>
          </>
        )}
      </div>
    </Popup>
  );
};

export default MarkerPopup;
