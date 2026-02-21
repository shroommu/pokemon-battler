"use client";

import { useState } from "react";
import { useSpring, animated, to, easings } from "react-spring";
import { locations } from "../constants";
import { useRouter } from "next/navigation";

const ENTER_VIEWPORT_VAR_STYLE = { "--enter-viewport-height": "100dvh" };
const ENTER_CONTENT_HEIGHT_CLASS =
  "h-[calc(var(--enter-viewport-height)-80px)] md:h-[calc(var(--enter-viewport-height)-120px)]";
const ENTER_COVER_TOP_CLASS = "top-[80px] md:top-[120px]";

export default function EnterPage({}) {
  const [visible, setVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const [logoColorSpring, logoColorApi] = useSpring(() => ({
    from: { opacity: 0.5 },
    onRest: () => router.push(locations.INDEX),
  }));

  const [screenColorSpring, screenColorApi] = useSpring(() => ({
    from: { color: "#9ca3af" },
    config: { duration: 1000 },
    onRest: () =>
      logoColorApi.start({
        from: { opacity: 0.5 },
        to: { opacity: 0 },
        config: { duration: 1000 },
        delay: 500,
      }),
  }));

  const [coverSpring, coverApi] = useSpring(() => ({
    from: {
      y: 0,
      height: 100,
    },
    onRest: () => {
      setVisible(false);
      screenColorApi.start({
        from: { color: "#9ca3af" },
        to: { color: "#e4e4e7" },
        config: { duration: 1000 },
      });
    },
    config: { duration: 1500, easing: easings.easeOutQuad },
  }));

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    coverApi.start({
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
    <div
      className="flex h-full w-full items-center justify-center"
      style={ENTER_VIEWPORT_VAR_STYLE}
    >
      <div
        className={`absolute left-0 flex flex-none ${ENTER_CONTENT_HEIGHT_CLASS} lg:h-auto lg:min-h-[calc(var(--enter-viewport-height)-120px)] w-full bg-red-500`}
        data-testid="enter-content-body-container"
      >
        <div
          data-testid="enter-screen-container"
          className="relative flex flex-row h-auto p-4 w-full"
        >
          <animated.div
            className="flex flex-col p-6 w-full rounded-md border-2 border-red-800 h-full shadow-[0_0_12px_0_rgba(0,0,0,0.5)_inset] items-center justify-center"
            data-testid="enter-screen"
            style={{ backgroundColor: screenColorSpring.color }}
          >
            <svg viewBox="0 0 6 6" className="h-48 w-96">
              <g>
                <animated.path
                  d="M 0 3 C 0 1.5 1.5 0 3 0 C 4.5 0 6 1.5 6 3 L 4 3 C 4 2.5 3.5 2 3 2 C 2.5 2 2 2.5 2 3 L 0 3 Z"
                  className="fill-gray-600"
                  style={{ opacity: logoColorSpring.opacity }}
                />
                <animated.rect
                  width="6px"
                  height=".25px"
                  y="2.75px"
                  className="fill-gray-300"
                  style={{ fill: screenColorSpring.color }}
                />
              </g>
              <g>
                <animated.path
                  d="M 6 3 C 6 4.5 4.5 6 3 6 C 1.5 6 0 4.5 0 3 L 2 3 C 2 3.5 2.5 4 3 4 C 3.5 4 4 3.5 4 3 L 6 3 Z"
                  className="fill-gray-500"
                  style={{ opacity: logoColorSpring.opacity }}
                />
                <animated.rect
                  width="6px"
                  height=".25px"
                  y="3px"
                  className="fill-gray-300"
                  style={{ fill: screenColorSpring.color }}
                />
              </g>
              <animated.circle
                r="0.75px"
                cx={3}
                cy={3}
                className="fill-gray-500"
                style={{ opacity: logoColorSpring.opacity }}
              />
            </svg>
          </animated.div>
        </div>
      </div>
      {visible && (
        <animated.div
          className={`absolute flex justify-center ${ENTER_COVER_TOP_CLASS} left-0 ${ENTER_CONTENT_HEIGHT_CLASS} w-full bg-red-700 drop-shadow-sm ${
            isAnimating ? "pointer-events-none" : "pointer-events-auto"
          }`}
          onClick={() => handleClick()}
          style={{
            y: to(coverSpring.y, (value) => `${value}%`),
            height: to(coverSpring.height, (value) => `${value}%`),
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
            <rect className="fill-yellow-600 h-[.4px] w-[4px] translate-y-[2px] group-hover:translate-y-[2.2px] group-active:translate-y-[2.4px] cursor-pointer" />
            <path
              d="M 0 2 L 2 0 L 4 2 L 0 2 Z"
              className="fill-yellow-400 group-hover:translate-y-[.2px] group-active:translate-y-[.4px] cursor-pointer"
            />
          </svg>
        </animated.div>
      )}
    </div>
  );
}
