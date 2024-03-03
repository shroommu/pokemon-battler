import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import PokemonList, { SORTING_METHODS } from "../pokemonList";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation");
usePathname.mockReturnValue("");

describe("PokemonList", () => {
  let pokemons;

  beforeEach(() => {
    pokemons = [
      {
        name: "Bulbasaur",
        pokedex_number: 1,
        sprite_party_filepath: "images/bulbasaur.png",
      },
      {
        name: "Ivysaur",
        pokedex_number: 3,
        sprite_party_filepath: "images/ivysaur.png",
      },
      {
        name: "Venusaur",
        pokedex_number: 4,
        sprite_party_filepath: "images/venusar.png",
      },
      {
        name: "Aerodactyl",
        pokedex_number: 2,
        sprite_party_filepath: "images/aerodactyl.png",
      },
    ];
  });

  it("renders", () => {
    const { container } = render(<PokemonList pokemons={pokemons} />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("doesn't blow up if pokemons doesn't exist", () => {
    const { container } = render(<PokemonList pokemons={null} />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("filters the list when searching for a pokemon", async () => {
    const user = userEvent.setup();
    render(<PokemonList pokemons={pokemons} />);

    await user.type(screen.getByTestId("pokemon-list-search-input"), "v");

    expect(screen.getByText("Venusaur")).toBeInTheDocument();
    expect(screen.getByText("Ivysaur")).toBeInTheDocument();
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("Aerodactyl")).not.toBeInTheDocument();
  });

  it("sorts the list alphabetically", () => {
    render(<PokemonList pokemons={pokemons} />);

    fireEvent.change(screen.getByTestId("pokemon-list-sort-dropdown"), {
      target: { value: SORTING_METHODS.alphabetical },
    });

    const pokemonUlElement = screen.getByTestId("pokemon-list");

    expect(pokemonUlElement.children.item(0).textContent).toContain(
      "Aerodactyl"
    );
    expect(pokemonUlElement.children.item(3).textContent).toContain("Venusaur");
  });

  it("sorts the list by pokedex number", () => {
    render(<PokemonList pokemons={pokemons} />);

    fireEvent.change(screen.getByTestId("pokemon-list-sort-dropdown"), {
      target: { value: SORTING_METHODS.numerical },
    });

    const pokemonUlElement = screen.getByTestId("pokemon-list");

    expect(pokemonUlElement.children.item(0).textContent).toContain(
      "Bulbasaur"
    );
    expect(pokemonUlElement.children.item(1).textContent).toContain(
      "Aerodactyl"
    );
    expect(pokemonUlElement.children.item(2).textContent).toContain("Ivysaur");
    expect(pokemonUlElement.children.item(3).textContent).toContain("Venusaur");
  });

  it("navigates from /pokedex URL correctly", () => {
    render(<PokemonList pokemons={pokemons} />);

    expect(screen.getByTestId("bulbasaur-link")).toHaveAttribute(
      "href",
      "pokedex/bulbasaur"
    );
  });

  it("navigates from one Pokemon to another Pokemon correctly", () => {
    usePathname.mockReturnValue("/pokedex/ivysaur");
    render(<PokemonList pokemons={pokemons} />);

    expect(screen.getByTestId("bulbasaur-link")).toHaveAttribute(
      "href",
      "bulbasaur"
    );
  });
});
