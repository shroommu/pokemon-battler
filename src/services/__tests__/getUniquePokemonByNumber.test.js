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
      findFirst: jest.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getUniquePokemonByNumber } from ".././getUniquePokemonByNumber";

describe("getUniquePokemonByNumber", () => {
  it("queries pokemon by pokedex number", async () => {
    prisma.pokemon.findFirst.mockResolvedValueOnce({ name: "Snorlax" });

    const result = await getUniquePokemonByNumber(143);

    expect(prisma.pokemon.findFirst).toHaveBeenCalledWith({
      where: {
        pokedex_number: 143,
      },
      select: {
        id: true,
        name: true,
        pokedex_number: true,
        sprite_front_filepath: true,
        sprite_party_filepath: true,
      },
    });
    expect(result).toEqual({ data: { name: "Snorlax" } });
  });
});
