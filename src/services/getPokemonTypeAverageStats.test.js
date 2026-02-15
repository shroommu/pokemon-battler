jest.mock("react", () => ({
  cache: (fn) => fn,
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    pokemon: {
      aggregate: jest.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getPokemonTypeAverageStats } from "./getPokemonTypeAverageStats";

describe("getPokemonTypeAverageStats", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("queries aggregate by primary/secondary type and rounds averages", async () => {
    prisma.pokemon.aggregate.mockResolvedValueOnce({
      _avg: {
        hp: 60.6,
        attack: 72.1,
        defense: 65.8,
        special: 80.4,
        speed: 75.5,
      },
    });

    const result = await getPokemonTypeAverageStats("Fire");

    expect(prisma.pokemon.aggregate).toHaveBeenCalledWith({
      _avg: {
        hp: true,
        attack: true,
        defense: true,
        special: true,
        speed: true,
      },
      where: {
        OR: [
          {
            primary_type: {
              is: {
                name: "Fire",
              },
            },
          },
          {
            secondary_type: {
              is: {
                name: "Fire",
              },
            },
          },
        ],
      },
    });
    expect(result).toEqual({
      data: {
        hp: 61,
        attack: 72,
        defense: 66,
        special: 80,
        speed: 76,
      },
    });
  });
});
