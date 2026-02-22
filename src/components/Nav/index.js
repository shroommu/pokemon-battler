"use client";

import React from "react";

import NavButton from "./components/NavButton";
import { locations } from "@/app/constants";

export default function Nav({}) {
  return (
    <nav className="hidden w-full md:flex" data-testid="main-nav">
      <ul className="flex flex-row items-center" data-testid="main-nav-list">
        <li>
          <NavButton href={locations.INDEX} buttonText={"Home"} />
        </li>
        <li>
          <NavButton href={locations.POKEDEX} buttonText={"Pokedex"} />
        </li>
        <li>
          <NavButton href={locations.ANALYTICS} buttonText={"Analyze"} />
        </li>
        <li>
          <NavButton href={locations.COMPARE} buttonText={"Compare"} />
        </li>
      </ul>
    </nav>
  );
}
