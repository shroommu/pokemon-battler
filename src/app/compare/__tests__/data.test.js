jest.mock("@/services/getAllPokemon", () => ({
  getAllPokemon: jest.fn(),
}));

jest.mock("@/services/getUniquePokemonByName", () => ({
  getUniquePokemonByName: jest.fn(),
}));

import { getAllPokemon } from "@/services/getAllPokemon";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import {
  getComparePokemonByName,
  getComparePokemonOptions,
  getPokemonNameFromSlug,
  normalizeComparePokemon,
} from "../data";

describe("compare data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("normalizes compare pokemon into compare-safe stats", () => {
    expect(
      normalizeComparePokemon({
        id: "a1",
        name: "Pikachu",
        pokedex_number: 25,
        hp: 35,
        attack: 55,
        defense: 40,
        special: 50,
        speed: 90,
        sprite_front_filepath: "/images/pokemon/sprites/front/pikachu.png",
        primary_type: { name: "Electric" },
        secondary_type: null,
      })
    ).toEqual({
      id: "a1",
      name: "Pikachu",
      pokedexNumber: 25,
      sprite: "/images/pokemon/sprites/front/pikachu.png",
      types: ["Electric"],
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        special: 50,
        speed: 90,
        total: 270,
      },
    });
  });

  it("maps selector options from pokemon list service", async () => {
    getAllPokemon.mockResolvedValueOnce({
      data: [
        { id: "001", name: "Bulbasaur", pokedex_number: 1 },
        { id: "004", name: "Charmander", pokedex_number: 4 },
      ],
    });

    await expect(getComparePokemonOptions()).resolves.toEqual([
      { id: "001", name: "Bulbasaur", slug: "bulbasaur", pokedexNumber: 1 },
      { id: "004", name: "Charmander", slug: "charmander", pokedexNumber: 4 },
    ]);
  });

  it("loads and normalizes detailed compare pokemon by name", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({
      data: {
        id: "b7",
        name: "Snorlax",
        pokedex_number: 143,
        hp: 160,
        attack: 110,
        defense: 65,
        special: 65,
        speed: 30,
        sprite_front_filepath: "/IMAGES/POKEMON/SPRITES/FRONT/SNORLAX.PNG",
        primary_type: { name: "Normal" },
        secondary_type: null,
      },
    });

    await expect(getComparePokemonByName("Snorlax")).resolves.toEqual({
      id: "b7",
      name: "Snorlax",
      pokedexNumber: 143,
      sprite: "/images/pokemon/sprites/front/snorlax.png",
      types: ["Normal"],
      stats: {
        hp: 160,
        attack: 110,
        defense: 65,
        special: 65,
        speed: 30,
        total: 430,
      },
    });
  });

  it("returns null for missing name input", async () => {
    await expect(getComparePokemonByName("")).resolves.toBeNull();
    expect(getUniquePokemonByName).not.toHaveBeenCalled();
  });

  it("resolves pokemon name by slug from options", () => {
    expect(
      getPokemonNameFromSlug(
        [
          { id: "001", name: "Bulbasaur", slug: "bulbasaur" },
          { id: "004", name: "Charmander", slug: "charmander" },
        ],
        "charmander"
      )
    ).toBe("Charmander");

    expect(getPokemonNameFromSlug([], "missing")).toBeNull();
  });
});
