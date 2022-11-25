const endStringLength = 4;

export function AbbreviateLink({
  text,
  maxLength = 22,
}: {
  text: string;
  maxLength?: number;
}) {
  if (text.length < maxLength) {
    return <>{text}</>;
  }

  return (
    <>
      {text.substring(0, maxLength - endStringLength)}...
      {text.substring(text.length - endStringLength, text.length)}
    </>
  );
}
