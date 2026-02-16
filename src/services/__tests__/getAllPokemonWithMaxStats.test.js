jest.mock("next/cache", () => ({
  unstable_cache: (fn) => fn,
}));

jest.mock("@/lib/queryTiming", () => ({
  timedQuery: (_queryName, queryFn) => queryFn(),
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
import { getAllPokemonWithMaxStats } from ".././getAllPokemonWithMaxStats";

describe("getAllPokemonWithMaxStats", () => {
  it("adds max_stats sum for each pokemon", async () => {
    prisma.pokemon.findMany.mockResolvedValueOnce([
      {
        id: "1",
        name: "Pikachu",
        pokedex_number: 25,
        sprite_party_filepath: "/images/pokemon/sprites/party/pikachu.png",
        hp: 35,
        attack: 55,
        defense: 30,
        special: 50,
        speed: 90,
        primary_type: { id: "type-electric", name: "Electric", display_color: "#f7d02c" },
        secondary_type: null,
      },
    ]);

    const result = await getAllPokemonWithMaxStats();

    expect(prisma.pokemon.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        name: true,
        pokedex_number: true,
        sprite_party_filepath: true,
        hp: true,
        attack: true,
        defense: true,
        special: true,
        speed: true,
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
    });
    expect(result).toEqual({
      data: [
        {
          id: "1",
          name: "Pikachu",
          pokedex_number: 25,
          sprite_party_filepath: "/images/pokemon/sprites/party/pikachu.png",
          hp: 35,
          attack: 55,
          defense: 30,
          special: 50,
          speed: 90,
          primary_type: {
            id: "type-electric",
            name: "Electric",
            display_color: "#f7d02c",
          },
          secondary_type: null,
          max_stats: 260,
        },
      ],
    });
  });
});
