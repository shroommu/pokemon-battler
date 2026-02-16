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
      findMany: jest.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getAllPokemon } from ".././getAllPokemon";

describe("getAllPokemon", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queries pokemon list with typed fields and sort order", async () => {
    prisma.pokemon.findMany.mockResolvedValueOnce([{ name: "Bulbasaur" }]);

    const result = await getAllPokemon();

    expect(prisma.pokemon.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        name: true,
        pokedex_number: true,
        sprite_party_filepath: true,
        primary_type: {
          select: {
            id: true,
            name: true,
            display_color: true,
          },
        },
        secondary_type: {
          select: {
            id: true,
            name: true,
            display_color: true,
          },
        },
      },
      orderBy: [{ pokedex_number: "asc" }],
    });
    expect(result).toEqual({ data: [{ name: "Bulbasaur" }] });
  });
});
