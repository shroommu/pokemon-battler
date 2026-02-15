jest.mock("react", () => ({
  cache: (fn) => fn,
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
import { getAllPokemonWithMaxStats } from "./getAllPokemonWithMaxStats";

describe("getAllPokemonWithMaxStats", () => {
  it("adds max_stats sum for each pokemon", async () => {
    prisma.pokemon.findMany.mockResolvedValueOnce([
      {
        name: "Pikachu",
        hp: 35,
        attack: 55,
        defense: 30,
        special: 50,
        speed: 90,
      },
    ]);

    const result = await getAllPokemonWithMaxStats();

    expect(prisma.pokemon.findMany).toHaveBeenCalledWith({
      include: {
        primary_type: true,
        secondary_type: true,
      },
    });
    expect(result).toEqual({
      data: [
        {
          name: "Pikachu",
          hp: 35,
          attack: 55,
          defense: 30,
          special: 50,
          speed: 90,
          max_stats: 260,
        },
      ],
    });
  });
});
