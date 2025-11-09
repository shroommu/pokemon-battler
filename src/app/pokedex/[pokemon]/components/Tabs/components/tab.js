import Link from "next/link";

import { tv } from "tailwind-variants";

const tabStyle = tv({
  base: "x-0 y-0 w-[5px] h-[2px] fill-gray-300",
  variants: {
    selected: {
      true: "fill-gray-200",
    },
  },
});

export default function Tab({ text, href, selected }) {
  return (
    <div className="flex relative h-8 w-16 lg:h-12 lg:w-24">
      <svg
        viewBox="0 0 5 2"
        className="absolute h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="folder-tab-clip">
            <path d="M 0 2 C 1 2 1 0 2 0 C 2.6667 0 3.3333 0 4 0 C 5 0 5 0 5 1 L 5 2 L 0 2 Z" />
          </clipPath>
          <linearGradient
            id="unselected-gradient"
            gradientTransform="rotate(90)"
          >
            <stop offset="75%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, .25)" />
          </linearGradient>
        </defs>
        <Link prefetch={true} href={href}>
          <rect
            clipPath="url(#folder-tab-clip)"
            className={tabStyle({ selected: selected })}
          />
          {!selected && (
            <rect
              className="x-0 y-0 w-[5px] h-[2px]"
              clipPath="url(#folder-tab-clip)"
              fill="url(#unselected-gradient)"
            />
          )}
        </Link>
      </svg>
      <div className="absolute flex h-full w-full pointer-events-none">
        <div className="flex h-full mr-4 ml-auto items-center text-l lg:text-xl">
          {text}
        </div>
      </div>
    </div>
  );
}
