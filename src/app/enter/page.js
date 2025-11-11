"use client";
import { useState } from "react";
import { useSpring, animated, to } from "react-spring";

export default function EnterPage({}) {
  const [visible, setVisible] = useState(true);

  const [springs, api] = useSpring(() => ({
    from: { y: 0 },
    config: { duration: 1000 },
  }));

  const handleClick = () => {
    api.start({
      from: {
        y: 0,
      },
      to: {
        y: 100,
      },
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <animated.div
      className="absolute top-[60px] md:top-[120px] left-0 h-[calc(100dvh-60px)] md:h-[calc(100dvh-120px)] w-full bg-red-700"
      onClick={() => handleClick()}
      style={{ y: to(springs.y, (value) => `${value}dvh`) }}
    >
      <svg
        className="absolute h-[120px] -top-[60px] w-full"
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
  );
}
