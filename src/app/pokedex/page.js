import PokedexContext from "./components/pokedexContext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info"] });

export default async function Pokedex() {
  const pokemons = await prisma.pokemon.findMany({});

  return (
    <div testid="container" className="flex grow flex-row h-auto w-auto">
      <PokedexContext pokemons={pokemons} />
    </div>
  );
}
