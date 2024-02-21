import { tv } from "tailwind-variants";
import { colors } from "./constants";

export const themes = {
  default: {
    background: colors.defaultButton.background,
    hover: colors.defaultButton.hover,
    active: colors.defaultButton.active,
    fontColor: colors.defaultButton.fontColor,
  },
  secondary: {
    background: colors.secondaryButton.background,
    hover: colors.secondaryButton.hover,
    active: colors.secondaryButton.active,
    fontColor: colors.secondaryButton.fontColor,
  },
  tertiary: {
    background: colors.tertiaryButton.background,
    hover: colors.tertiaryButton.hover,
    active: colors.tertiaryButton.active,
    disabled: colors.tertiaryButton.disabled,
    fontColor: colors.tertiaryButton.fontColor,
  },
};

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
      className={buttonClass({ class: `${margin} ${fontSize} ${extraClasses}` })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
