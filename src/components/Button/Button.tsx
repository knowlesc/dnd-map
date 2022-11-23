const defaultClasses = [
  "cursor-pointer",
  "tracking-wide",
  "bg-white",
  "color-neutral-900",
  "uppercase",
  "whitespace-nowrap",
  "h-8",
  "px-2",
  "py-1",
  "text-sm",
  "lg:h-11",
  "lg:px-4",
  "lg:py-2",
  "lg:text-lg",
].join(" ");

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...otherProps } = props;
  return (
    <button className={`${defaultClasses} ${className} `} {...otherProps} />
  );
}
