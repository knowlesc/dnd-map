import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";

type Props = {
  onClose: () => void;
};

export function MapOverlay({
  children,
  onClose,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-1000">
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-40 bg-black" />
      <div className="absolute top-4 left-4 bottom-4 right-4 z-1000 rounded-sm drop-shadow-lg bg-white flex justify-center items-center">
        <div className="absolute right-1 top-1">
          <Button onClick={() => onClose()}>
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
