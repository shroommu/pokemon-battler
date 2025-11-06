"use client";

import { usePathname } from "next/navigation";
import Tab from "./components/tab";

export default function Tabs({ selectedTab, setSelectedTab }) {
  const pathname = usePathname();
  const pokemonName = pathname.split("/")[2];

  return (
    <div className="h-12">
      <ul className="flex flex-row h-auto">
        <li key={"info"}>
          <Tab text={"Info"} href={`/pokedex/${pokemonName}`} />
        </li>
        <li key={"stats"}>
          <Tab text={"Stats"} href={`/pokedex/${pokemonName}/stats`} />
        </li>
      </ul>
    </div>
  );
}
