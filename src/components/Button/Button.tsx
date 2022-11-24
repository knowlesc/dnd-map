const defaultClasses = [
  "cursor-pointer",
  "tracking-wide",
  "bg-white",
  "color-neutral-900",
  "flex",
  "justify-left",
  "items-center",
  "h-11",
  "px-4",
  "py-2",
  "text-sm",
  "md:text-md",
  "lg:text-lg",
  "leading-none",
  "font-condensed",
  "rounded-sm",
].join(" ");

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...otherProps } = props;
  return (
    <button className={`${defaultClasses} ${className}`} {...otherProps} />
  );
}
