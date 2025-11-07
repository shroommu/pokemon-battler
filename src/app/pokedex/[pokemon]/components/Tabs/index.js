"use client";

import { usePathname } from "next/navigation";
import Tab from "./components/tab";

export default function Tabs({}) {
  const pathname = usePathname();
  const pokemonName = pathname.split("/")[2].replace(" ", "-").toLowerCase();

  return (
    <div className="h-12">
      <ul className="flex flex-row h-auto">
        <li key={"info"}>
          <Tab
            text={"Info"}
            href={`/pokedex/${pokemonName}`}
            selected={pathname.split("/").length == 3}
          />
        </li>
        <li key={"stats"}>
          <Tab
            text={"Stats"}
            href={`/pokedex/${pokemonName}/stats`}
            selected={pathname.includes("stats")}
          />
        </li>
      </ul>
    </div>
  );
}
