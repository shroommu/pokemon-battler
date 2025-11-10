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
        <div className="absolute bg-white mt-2 p-2 z-20 rounded-md">
          <ul>
            <li>
              <Link href={locations.INDEX} onClick={() => setIsOpen(false)}>
                <h1 className="text-lg">Home</h1>
              </Link>
            </li>
            <li>
              <Link href={locations.POKEDEX} onClick={() => setIsOpen(false)}>
                <h1 className="text-lg">Pokedex</h1>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
