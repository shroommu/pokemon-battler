"use client";

import { useState } from "react";
import Link from "next/link";

import { locations } from "@/app/constants";
import Button from "../Button";

export default function MobileNavMenu({}) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: locations.INDEX, label: "Home" },
    { href: locations.POKEDEX, label: "Pokedex" },
    { href: locations.ANALYTICS, label: "Analyze" },
    { href: locations.COMPARE, label: "Compare" },
  ];

  function renderButtonChrome() {
    return (
      <svg
        viewBox="0 0 10 10"
        className="absolute h-full w-full group peer"
        preserveAspectRatio="none"
      >
        <rect
          height="90%"
          width="100%"
          y={1}
          rx={0.5}
          ry={0.5}
          className="fill-gray-700"
        />
        <rect
          height="90%"
          width="100%"
          rx={0.5}
          ry={0.5}
          className="y-[0] fill-gray-500 group-hover:translate-y-[0.5px] group-active:translate-y-[1px]"
        />
      </svg>
    );
  }

  return (
    <div className="block pt-2 md:hidden">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        extraClasses="relative z-30 flex h-8 w-18 p-0 mr-2"
        testId="mobile-menu-toggle"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
      >
        {renderButtonChrome()}
        <div className="absolute flex h-full w-full items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-200 text-shadow-lg pointer-events-none -translate-y-[4%] peer-hover:translate-y-0 peer-active:translate-y-[4%]">
          <span aria-hidden="true">{isOpen ? "X" : "|||"}</span>
          <span>Menu</span>
        </div>
      </Button>

      <div
        className={`fixed inset-x-0 top-[80px] z-20 h-[calc(100svh-80px)] p-3 transition duration-200 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        data-testid="mobile-menu-container"
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`h-full w-full rounded-xl border border-red-950/70 bg-red-950/20 backdrop-blur-sm transition duration-200 ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          }`}
          data-testid="blur-container"
        >
          <section
            id="mobile-navigation-panel"
            className="mx-auto mt-2 w-full max-w-sm rounded-xl border border-gray-400 bg-gray-200 p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between border-b border-gray-400 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-700">
                Navigation
              </h2>
              <button
                type="button"
                className="rounded-md border border-gray-500 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 hover:bg-gray-300 active:bg-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="relative block h-10 w-full"
                    >
                      {renderButtonChrome()}
                      <div className="absolute flex h-full w-full items-center justify-center text-base text-gray-200 text-shadow-lg pointer-events-none -translate-y-[4%] peer-hover:translate-y-0 peer-active:translate-y-[4%]">
                        {item.label}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
