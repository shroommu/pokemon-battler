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
import { getAllPokemonAverageStats } from ".././getAllPokemonAverageStats";

describe("getAllPokemonAverageStats", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses prisma aggregate and rounds values", async () => {
    prisma.pokemon.aggregate.mockResolvedValueOnce({
      _avg: {
        hp: 45.4,
        attack: 49.5,
        defense: 49.49,
        special: 65.6,
        speed: 45.2,
      },
    });

    const result = await getAllPokemonAverageStats();

    expect(prisma.pokemon.aggregate).toHaveBeenCalledWith({
      _avg: {
        hp: true,
        attack: true,
        defense: true,
        special: true,
        speed: true,
      },
    });
    expect(result).toEqual({
      data: {
        hp: 45,
        attack: 50,
        defense: 49,
        special: 66,
        speed: 45,
      },
    });
  });

  it("returns zero defaults for null aggregate values", async () => {
    prisma.pokemon.aggregate.mockResolvedValueOnce({
      _avg: {
        hp: null,
        attack: null,
        defense: null,
        special: null,
        speed: null,
      },
    });

    const result = await getAllPokemonAverageStats();

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
