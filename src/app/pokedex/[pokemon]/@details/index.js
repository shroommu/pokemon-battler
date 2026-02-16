"use client";

import { usePathname } from "next/navigation";

import Moves from "./components/moves";
import Stats from "./components/stats";
import PagePill from "./components/PagePill";

function getSelectedTabFromPath(pathname, fallbackTab) {
  if (!pathname) {
    return fallbackTab;
  }

  return pathname.endsWith("/stats") ? "Stats" : "Moves";
}

export default function Details({ pokemon, pokemonSlug, selectedTab }) {
  const pathname = usePathname();
  const activeTab = getSelectedTabFromPath(pathname, selectedTab);

  return (
    <div
      className="flex flex-col w-full py-4 xl:py-0 xl:flex-1 xl:h-full"
      data-testid="details-container"
    >
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-row gap-2">
          <PagePill
            text="Moves"
            href={`/pokedex/${pokemonSlug}/moves`}
            selected={activeTab === "Moves"}
          />
          <PagePill
            text="Stats"
            href={`/pokedex/${pokemonSlug}/stats`}
            selected={activeTab === "Stats"}
          />
        </div>
      </div>
      <div className="w-full xl:h-full">
        {activeTab === "Stats" ? <Stats pokemon={pokemon} /> : <Moves pokemon={pokemon} />}
      </div>
    </div>
  );
}
