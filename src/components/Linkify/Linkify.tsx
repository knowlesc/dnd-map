import ReactLinkify from "react-linkify";
import { AbbreviateLink } from "../AbbreviateLink/AbbreviateLink";

type Props = {
  text: string;
};

export function Linkify({ text }: Props) {
  return (
    <ReactLinkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          className="underline text-blue-500"
          target="blank"
          rel="noopener noreferrer"
          href={decoratedHref}
          key={key}
        >
          <AbbreviateLink text={decoratedText} />
        </a>
      )}
    >
      {text}
    </ReactLinkify>
  );
}
