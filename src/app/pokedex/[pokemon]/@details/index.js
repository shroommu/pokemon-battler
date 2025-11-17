"use client";

import { useState } from "react";

import Moves from "./components/moves";
import Stats from "./components/stats";
import PagePill from "./components/PagePill";

export default function Details({ pokemon }) {
  const [selectedTab, setSelectedTab] = useState("Moves");

  return (
    <div
      className="flex flex-col w-full py-4 xl:py-0 xl:flex-1 xl:h-full"
      data-testid="details-container"
    >
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row gap-2">
          <PagePill
            text="Moves"
            onClick={() => setSelectedTab("Moves")}
            selected={selectedTab == "Moves"}
          />
          <PagePill
            text="Stats"
            onClick={() => setSelectedTab("Stats")}
            selected={selectedTab == "Stats"}
          />
        </div>
      </div>
      <div className="w-full xl:h-full">
        {selectedTab == "Moves" && <Moves pokemon={pokemon} />}
        {selectedTab == "Stats" && <Stats pokemon={pokemon} />}
      </div>
    </div>
  );
}
