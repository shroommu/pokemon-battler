import { render, screen } from "@testing-library/react";
import PokemonListDropdown from "../pokemonListDropdown";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("pokemonListDropdown", () => {
  let pokemons;

  beforeEach(() => {
    pokemons = [];
  });

  it("renders", () => {
    const { container } = render(<PokemonListDropdown pokemons={pokemons} />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
