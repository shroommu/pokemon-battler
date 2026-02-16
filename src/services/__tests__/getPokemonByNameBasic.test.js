jest.mock("next/cache", () => ({
  unstable_cache: (fn) => fn,
}));

jest.mock("@/lib/queryTiming", () => ({
  timedQuery: (_name, queryFn) => queryFn(),
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    pokemon: {
      findUnique: jest.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getPokemonByNameBasic } from ".././getPokemonByNameBasic";

describe("getPokemonByNameBasic", () => {
  it("queries basic pokemon fields by name", async () => {
    prisma.pokemon.findUnique.mockResolvedValueOnce({ name: "Mew" });

    const result = await getPokemonByNameBasic("Mew");

    expect(prisma.pokemon.findUnique).toHaveBeenCalledWith({
      where: { name: "Mew" },
      select: {
        id: true,
        name: true,
        pokedex_number: true,
      },
    });
    expect(result).toEqual({ data: { name: "Mew" } });
  });
});
