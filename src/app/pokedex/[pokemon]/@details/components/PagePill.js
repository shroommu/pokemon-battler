import Link from "next/link";
import { tv } from "tailwind-variants";

const pillStyle = tv({
  base: "flex justify-center items-center p-2 rounded-md bg-gray-300 cursor-pointer",
  variants: {
    selected: {
      true: "bg-gray-400",
    },
  },
});

export default function PagePill({ text, href, selected }) {
  return (
    <Link
      href={href}
      className={pillStyle({ selected })}
      data-testid={`page-pill-${text.toLowerCase()}`}
    >
      {text}
    </Link>
  );
}
