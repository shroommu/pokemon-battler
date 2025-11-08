"use client";

import { useState } from "react";
import Link from "next/link";

import { locations } from "@/app/constants";

export default function MobileNavMenu({}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block pt-2 md:hidden">
      <svg
        viewBox="0 0 4 4"
        className="h-6 w-6 fill-red-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <rect width={4} height={0.75} rx={0.25} ry={0.25} />
        <rect width={4} height={0.75} rx={0.25} ry={0.25} y={1.625} />
        <rect width={4} height={0.75} rx={0.25} ry={0.25} y={3.25} />
      </svg>
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
