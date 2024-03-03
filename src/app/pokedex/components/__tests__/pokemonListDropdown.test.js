import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRouter, usePathname } from "next/navigation";

import PokemonListDropdown from "../pokemonListDropdown";

const pushMock = jest.fn();
jest.mock("next/navigation");
useRouter.mockReturnValue({
  push: pushMock,
});

usePathname.mockReturnValue("");

describe("pokemonListDropdown", () => {
  let pokemons;

  beforeEach(() => {
    pushMock.mockClear();

    pokemons = [
      {
        name: "Bulbasaur",
        pokedex_number: 1,
      },
      {
        name: "Ivysaur",
        pokedex_number: 2,
      },
      {
        name: "Venusaur",
        pokedex_number: 3,
      },
    ];
  });

  it("renders", () => {
    const { container } = render(<PokemonListDropdown pokemons={pokemons} />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("navigates from /pokedex URL correctly", () => {
    render(<PokemonListDropdown pokemons={pokemons} />);

    fireEvent.change(screen.getByTestId("pokemon-list-dropdown"), {
      target: { value: "bulbasaur" },
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("pokedex/bulbasaur");
  });

  it("navigates from one Pokemon to another Pokemon correctly", () => {
    usePathname.mockReturnValue("/pokedex/ivysaur");
    const user = userEvent.setup();

    render(<PokemonListDropdown pokemons={pokemons} />);

    fireEvent.change(screen.getByTestId("pokemon-list-dropdown"), {
      target: { value: "bulbasaur" },
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("bulbasaur");
  });
});
