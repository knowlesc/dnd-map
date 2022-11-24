import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  text: string;
  icon: IconProp;
};

export function ConditionalIconText({ text, icon }: Props) {
  return (
    <>
      <FontAwesomeIcon icon={icon} className="md:mr-2" />
      <span className="hidden md:inline">{text}</span>
    </>
  );
}
