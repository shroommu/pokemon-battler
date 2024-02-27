import { Suspense } from "react";
import PokedexEntrySkeleton from "./components/pokedexEntrySkeleton";

export default function PokedexEntryLayout({ children }) {
  return <Suspense fallback={<PokedexEntrySkeleton />}>{children}</Suspense>;
}
