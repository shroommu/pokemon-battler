import { tv } from "tailwind-variants";

const buttonClass = tv({
  base: "flex p-2 h-fit w-fit",
  variants: {
    type: {
      primary: "bg-red-600 rounded-md hover:bg-red-500 active:bg-red-700",
    },
  },
});

export default function Button({
  children,
  onClick,
  type,
  disabled,
  extraClasses,
}) {
  return (
    <button
      className={buttonClass({
        class: extraClasses ?? "",
        type: type,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
