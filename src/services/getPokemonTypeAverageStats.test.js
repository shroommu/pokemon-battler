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

  it("maps null aggregate values to zero", async () => {
    prisma.pokemon.aggregate.mockResolvedValueOnce({
      _avg: {
        hp: null,
        attack: null,
        defense: null,
        special: null,
        speed: null,
      },
    });

    const result = await getPokemonTypeAverageStats("Ghost");

    expect(result).toEqual({
      data: {
        hp: 0,
        attack: 0,
        defense: 0,
        special: 0,
        speed: 0,
      },
    });
  });
});
