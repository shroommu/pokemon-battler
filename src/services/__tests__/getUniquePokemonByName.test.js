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
import { getUniquePokemonByName } from ".././getUniquePokemonByName";

describe("getUniquePokemonByName", () => {
  it("queries detailed pokemon shape by name", async () => {
    prisma.pokemon.findUnique.mockResolvedValueOnce({ name: "Mewtwo" });

    const result = await getUniquePokemonByName("Mewtwo");

    expect(prisma.pokemon.findUnique).toHaveBeenCalledWith({
      where: {
        name: "Mewtwo",
      },
      include: {
        primary_type: true,
        secondary_type: true,
        pokemon_moves: {
          select: {
            move: {
              include: {
                type: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    expect(result).toEqual({ data: { name: "Mewtwo" } });
  });
});
