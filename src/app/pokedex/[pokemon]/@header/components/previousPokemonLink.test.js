import { render, screen } from "@testing-library/react";
import PreviousPokemonLink from "./previousPokemonLink";

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

describe("PreviousPokemonLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders previous pokemon link when one exists", async () => {
    getPokemonByNameBasic.mockResolvedValueOnce({
      data: { pokedex_number: 26 },
    });
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Pikachu",
        pokedex_number: 25,
        sprite_party_filepath: "/images/pokemon/sprites/party/pikachu.png",
      },
    });

    render(await PreviousPokemonLink({ pokemonSlug: "raichu" }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokedex/pikachu");
  });

  it("renders spacer when previous pokemon is unavailable", async () => {
    getPokemonByNameBasic.mockResolvedValueOnce({ data: null });

    const { container } = render(
      await PreviousPokemonLink({ pokemonSlug: "missingno" })
    );
    expect(container.querySelector(".w-24")).toBeInTheDocument();
  });
});
