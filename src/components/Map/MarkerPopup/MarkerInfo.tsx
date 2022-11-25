import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { IMarker } from "../../../types/IMarker";
import { MapIcon } from "../MapIcon/MapIcon";
import Linkify from "react-linkify";
import { AbbreviateLink } from "../../AbbreviateLink/AbbreviateLink";

export function MarkerInfo({ marker }: { marker: IMarker }) {
  const { canEditMarkers } = useContext(UserContext);

  return (
    <div className="text-sm">
      <div className="flex mb-4">
        <MapIcon
          size={24}
          className="group-hover:translate-y-0.5 transition-transform flex-shrink-0"
          icon={marker.icon}
        />
        <span className="ml-1 font-fancy italic font-semibold text-base flex-grow">
          {marker.name}
          {marker.dmOnly && (
            <FontAwesomeIcon icon="lock" className="text-xs ml-1" />
          )}
        </span>
      </div>
      <div>
        {marker.notes && (
          <div className="text text-slate-600 whitespace-pre-line mb-2 bg-slate-200 rounded-sm p-2 max-h-32 overflow-y-auto">
            {marker.notes}
          </div>
        )}
        {canEditMarkers && marker.dmNotes && (
          <div className="relative">
            <div className="text text-slate-600 whitespace-pre-line bg-slate-200 rounded-sm p-2 max-h-32 overflow-y-auto pb-4">
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a
                    target="blank"
                    rel="noopener noreferrer"
                    href={decoratedHref}
                    key={key}
                  >
                    <AbbreviateLink text={decoratedText} />
                  </a>
                )}
              >
                {marker.dmNotes}
              </Linkify>
            </div>
            <FontAwesomeIcon
              icon="mask"
              className="text-xs absolute right-1 bottom-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
