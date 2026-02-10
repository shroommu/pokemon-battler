"use client";

import { useState } from "react";
import Link from "next/link";

import { locations } from "@/app/constants";
import Button from "../Button";

export default function MobileNavMenu({}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block pt-2 md:hidden">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        extraClasses={"relative flex p-0 h-8 w-16 mr-2"}
      >
        <svg
          viewBox="0 0 10 10"
          className="absolute h-full w-full group peer"
          preserveAspectRatio="none"
        >
          <rect
            height={"90%"}
            width={"100%"}
            y={1}
            rx={0.5}
            ry={0.5}
            className="fill-gray-700"
          />
          <rect
            height={"90%"}
            width={"100%"}
            rx={0.5}
            ry={0.5}
            className="fill-gray-500 y-[0] group-hover:translate-y-[0.5px] group-active:translate-y-[1px]"
          />
        </svg>
        <div className="absolute flex h-full w-full justify-center items-center text-lg text-gray-300 text-shadow-lg pointer-events-none -translate-y-[5%] peer-hover:translate-y-0 peer-active:translate-y-[5%]">
          Menu
        </div>
      </Button>
      {isOpen && (
        <div
          className="absolute flex left-0 top-[80px] h-[calc(100svh-80px)] w-full z-20 p-4"
          data-testid="mobile-menu-container"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex h-full w-full backdrop-blur-xs backdrop-brightness-75 rounded-md border-2 border-red-800 justify-center"
            data-testid="blur-container"
          >
            <div className="flex p-6 shadow-lg bg-gray-200 border-2 border-gray-400 rounded-md mt-[33%] mb-auto">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href={locations.INDEX} onClick={() => setIsOpen(false)}>
                    <h1 className="text-lg">Home</h1>
                  </Link>
                </li>
                <li>
                  <Link
                    href={locations.POKEDEX}
                    onClick={() => setIsOpen(false)}
                  >
                    <h1 className="text-lg">Pokedex</h1>
                  </Link>
                  <Link
                    href={locations.ANALYTICS}
                    onClick={() => setIsOpen(false)}
                  >
                    <h1 className="text-lg">Analyze</h1>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
