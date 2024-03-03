import { render, screen } from "@testing-library/react";
import PokemonList from "../pokemonList";

describe("PokemonList", () => {
  it("renders", () => {
    const { container } = render(<PokemonList />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
