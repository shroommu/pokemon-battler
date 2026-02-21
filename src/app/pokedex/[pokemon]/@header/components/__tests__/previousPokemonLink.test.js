import { render, screen } from "@testing-library/react";
import PreviousPokemonLink from ".././previousPokemonLink";

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

describe("PreviousPokemonLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders previous pokemon link when one exists", async () => {
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Pikachu",
        pokedex_number: 25,
        sprite_party_filepath: "/images/pokemon/sprites/party/pikachu.png",
      },
    });

    render(await PreviousPokemonLink({ currentPokedexNumber: 26 }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokedex/pikachu/moves");
  });

  it("keeps stats segment when provided", async () => {
    getUniquePokemonByNumber.mockResolvedValueOnce({
      data: {
        name: "Pikachu",
        pokedex_number: 25,
        sprite_party_filepath: "/images/pokemon/sprites/party/pikachu.png",
      },
    });

    render(await PreviousPokemonLink({ currentPokedexNumber: 26, tabSegment: "stats" }));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokedex/pikachu/stats");
  });

  it("renders spacer when previous pokemon is unavailable", async () => {
    const { container } = render(
      await PreviousPokemonLink({ currentPokedexNumber: null })
    );
    expect(container.querySelector(".w-24")).toBeInTheDocument();
  });
});
