import Link from "next/link";

import { tv } from "tailwind-variants";

const pillStyle = tv({
  base: "flex justify-center items-center w-12 h-8 p-2 rounded-md bg-gray-300 mr-2 last:mr-0",
  variants: {
    selected: {
      true: "bg-gray-400",
    },
  },
});

export default function PagePill({ text, href, selected }) {
  return (
    <Link
      prefetch={true}
      href={href}
      className={pillStyle({ selected: selected })}
    >
      {text}
    </Link>
  );
}
