import { tv } from "tailwind-variants";

const pillStyle = tv({
  base: "flex justify-center items-center p-2 rounded-md bg-gray-300 cursor-pointer",
  variants: {
    selected: {
      true: "bg-gray-400",
    },
  },
});

export default function PagePill({ text, onClick, selected }) {
  return (
    <div onClick={onClick} className={pillStyle({ selected: selected })}>
      {text}
    </div>
  );
}
