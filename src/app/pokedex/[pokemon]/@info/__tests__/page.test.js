import { render, screen } from "@testing-library/react";

jest.mock("@/services/getUniquePokemonByName", () => ({
  getUniquePokemonByName: jest.fn(),
}));

jest.mock("next/image", () => {
  return ({ fill, priority, unoptimized, ...props }) => <img {...props} />;
});

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));

import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { notFound } from "next/navigation";
import Page from ".././page";

describe("@info page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls notFound when pokemon cannot be resolved", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({ data: null });

    await expect(Page({ params: { pokemon: "missingno" } })).rejects.toThrow(
      "NOT_FOUND"
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("renders both type pills when pokemon has a secondary type", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({
      data: {
        id: 6,
        name: "Charizard",
        sprite_front_filepath: "/images/pokemon/sprites/front/charizard.png",
        pokedex_entry: "Spits fire that is hot enough to melt boulders.",
        primary_type: { name: "Fire" },
        secondary_type: { name: "Flying" },
      },
    });

    render(await Page({ params: { pokemon: "charizard" } }));

    expect(screen.getByTestId("charizard-pokemon-data")).toBeInTheDocument();
    expect(screen.getByTestId("Fire-type-pill")).toBeInTheDocument();
    expect(screen.getByTestId("Flying-type-pill")).toBeInTheDocument();
  });

  it("renders only the primary type pill when no secondary type exists", async () => {
    getUniquePokemonByName.mockResolvedValueOnce({
      data: {
        id: 25,
        name: "Pikachu",
        sprite_front_filepath: "/images/pokemon/sprites/front/pikachu.png",
        pokedex_entry:
          "When several of these Pokemon gather, their electricity could build and cause lightning storms.",
        primary_type: { name: "Electric" },
        secondary_type: null,
      },
    });

    render(await Page({ params: { pokemon: "pikachu" } }));

    expect(screen.getByTestId("Electric-type-pill")).toBeInTheDocument();
    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });
});
