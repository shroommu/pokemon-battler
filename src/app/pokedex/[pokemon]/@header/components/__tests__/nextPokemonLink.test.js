import { render, screen } from "@testing-library/react";
import NextPokemonLink from ".././nextPokemonLink";

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

jest.mock("@/services/getUniquePokemonByNumber", () => ({
  getUniquePokemonByNumber: jest.fn(),
}));

import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

describe("NextPokemonLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders next pokemon link when one exists", async () => {
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Raichu",
        pokedex_number: 26,
        sprite_party_filepath: "/images/pokemon/sprites/party/raichu.png",
      },
    });

    render(await NextPokemonLink({ currentPokedexNumber: 25 }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokedex/raichu/moves");
  });

  it("keeps stats segment when provided", async () => {
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Raichu",
        pokedex_number: 26,
        sprite_party_filepath: "/images/pokemon/sprites/party/raichu.png",
      },
    });

    render(await NextPokemonLink({ currentPokedexNumber: 25, tabSegment: "stats" }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokedex/raichu/stats");
  });

  it("renders spacer when next pokemon is unavailable", async () => {
    const { container } = render(
      await NextPokemonLink({ currentPokedexNumber: null })
    );
    expect(container.querySelector(".w-24")).toBeInTheDocument();
  });
});
