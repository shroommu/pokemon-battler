import { tv } from "tailwind-variants";

const buttonClass = tv({
  base: "flex p-2 h-fit w-fit",
});

export default function Button({
  children,
  onClick,
  margin,
  fontSize,
  disabled,
  extraClasses,
}) {
  return (
    <button
      className={buttonClass({
        class: `${margin} ${fontSize} ${extraClasses}`,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
