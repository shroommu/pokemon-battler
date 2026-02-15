import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonList from "./pokemonList";

jest.mock("next/navigation", () => ({
  usePathname: () => "/pokedex/pikachu",
}));

jest.mock("../../components/pokedexButton", () => {
  return ({ pokemon, href, selected }) => (
    <li data-testid="pokemon-button">
      {`${pokemon.name}|${href}|${selected ? "selected" : "not-selected"}`}
    </li>
  );
});

describe("PokemonList", () => {
  const pokemons = [
    { name: "Charizard", pokedex_number: 6 },
    { name: "Pikachu", pokedex_number: 25 },
    { name: "Bulbasaur", pokedex_number: 1 },
  ];

  it("sorts numerically by default and marks selected pokemon", () => {
    render(<PokemonList pokemons={pokemons} />);

    const items = screen.getAllByTestId("pokemon-button").map((el) => el.textContent);
    expect(items).toEqual([
      "Bulbasaur|/pokedex/bulbasaur|not-selected",
      "Charizard|/pokedex/charizard|not-selected",
      "Pikachu|/pokedex/pikachu|selected",
    ]);
  });

  it("filters by name and supports alphabetical sort", async () => {
    const user = userEvent.setup();
    render(<PokemonList pokemons={pokemons} />);

    await user.selectOptions(
      screen.getByTestId("pokemon-list-sort-dropdown"),
      "ALPHA"
    );

    let items = screen.getAllByTestId("pokemon-button").map((el) => el.textContent);
    expect(items).toEqual([
      "Bulbasaur|/pokedex/bulbasaur|not-selected",
      "Charizard|/pokedex/charizard|not-selected",
      "Pikachu|/pokedex/pikachu|selected",
    ]);

    await user.type(screen.getByTestId("pokemon-list-search-input"), "char");
    items = screen.getAllByTestId("pokemon-button").map((el) => el.textContent);
    expect(items).toEqual(["Charizard|/pokedex/charizard|not-selected"]);
  });
});
