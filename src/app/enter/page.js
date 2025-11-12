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
      delay: 300,
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {visible && (
        <animated.div
          className="absolute flex justify-center top-[80px] md:top-[120px] left-0 h-[calc(100dvh-80px)] md:h-[calc(100dvh-120px)] w-full bg-red-700 drop-shadow-sm"
          onClick={() => handleClick()}
          style={{
            y: to(spring.y, (value) => `${value}dvh`),
            height: to(spring.height, (value) => `${value}dvh`),
          }}
        >
          <svg
            className="absolute h-[80px] md:h-[120px] -top-[40px] md:-top-[60px] w-full pointer-events-none"
            viewBox="0 0 13 2.1"
            preserveAspectRatio="none"
          >
            <path
              d="M 13 0 C 11 0 12 0 9 0 C 8 0 7 1 6 1 L 0 1 L 0 2 L 13 2 Z"
              className="fill-red-700 pointer-events-auto"
            />
          </svg>
          <svg className="relative mt-12 h-12 w-24 group" viewBox="0 0 4 2.4">
            <rect className="fill-yellow-600 h-[.4px] w-[4px] translate-y-[2px] group-hover:translate-y-[2.2px] group-active:translate-y-[2.4px]" />
            <path
              d="M 0 2 L 2 0 L 4 2 L 0 2 Z"
              className="fill-yellow-400 group-hover:translate-y-[.2px] group-active:translate-y-[.4px]"
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
