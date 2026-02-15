import { render, screen } from "@testing-library/react";
import NextPokemonLink from "./nextPokemonLink";

jest.mock("next/image", () => {
  return ({ fill, priority, unoptimized, ...props }) => <img {...props} />;
});

jest.mock("next/link", () => {
  return ({ children, href, prefetch, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("@/services/getPokemonByNameBasic", () => ({
  getPokemonByNameBasic: jest.fn(),
}));

jest.mock("@/services/getUniquePokemonByNumber", () => ({
  getUniquePokemonByNumber: jest.fn(),
}));

import { getPokemonByNameBasic } from "@/services/getPokemonByNameBasic";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

describe("NextPokemonLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders next pokemon link when one exists", async () => {
    getPokemonByNameBasic.mockResolvedValueOnce({
      data: { pokedex_number: 25 },
    });
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Raichu",
        pokedex_number: 26,
        sprite_party_filepath: "/images/pokemon/sprites/party/raichu.png",
      },
    });

    render(await NextPokemonLink({ pokemonSlug: "pikachu" }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokedex/raichu");
  });

  it("renders spacer when next pokemon is unavailable", async () => {
    getPokemonByNameBasic.mockResolvedValueOnce({ data: null });

    const { container } = render(
      await NextPokemonLink({ pokemonSlug: "missingno" })
    );
    expect(container.querySelector(".w-24")).toBeInTheDocument();
  });
});
