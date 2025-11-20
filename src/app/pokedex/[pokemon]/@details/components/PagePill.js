import { tv } from "tailwind-variants";

const pillStyle = tv({
  base: "flex justify-center items-center w-12 h-8 p-2 rounded-md bg-gray-300",
  variants: {
    selected: {
      true: "bg-gray-400",
    },
  },
});

export default function PagePill({ text, onClick, selected }) {
  return (
    <div
      prefetch={true}
      onClick={onClick}
      className={pillStyle({ selected: selected })}
    >
      {text}
    </div>
  );
}
