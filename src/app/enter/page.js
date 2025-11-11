"use client";
import Link from "next/link";
import { useState } from "react";
import { useSpring, animated, to } from "react-spring";
import { locations } from "../constants";

export default function EnterPage({}) {
  const [visible, setVisible] = useState(true);

  const [spring, api] = useSpring(() => ({
    from: {
      y: 0,
      height: 100,
    },
    onRest: () => setVisible(false),
    onResolve: () => console.log("animation resolved"),
    config: { duration: 1000 },
  }));

  const handleClick = () => {
    api.start({
      from: {
        y: 0,
        height: 100,
      },
      to: {
        y: 100,
        height: 0,
      },
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {visible && (
        <animated.div
          className="absolute top-[80px] md:top-[120px] left-0 h-[calc(100dvh-80px)] md:h-[calc(100dvh-120px)] w-full bg-red-700"
          onClick={() => handleClick()}
          style={{
            y: to(spring.y, (value) => `${value}dvh`),
            height: to(spring.height, (value) => `${value}dvh`),
          }}
        >
          <svg
            className="absolute h-[80px] md:h-[120px] -top-[40px] md:-top-[60px] w-full"
            viewBox="0 0 13 2.1"
            preserveAspectRatio="none"
          >
            <path
              d="M 13 0 C 11 0 12 0 9 0 C 8 0 7 1 6 1 L 0 1 L 0 2 L 13 2 Z"
              className="fill-red-900"
            />
            <path
              d="M 13 0 C 11 0 12 0 9 0 C 8 0 7 1 6 1 L 0 1 L 0 2 L 13 2 Z"
              className="fill-red-700 translate-y-[.1px]"
            />
          </svg>
        </animated.div>
      )}
      <Link href={locations.INDEX} className="text-xl underline">
        Power On
      </Link>
    </div>
  );
}
