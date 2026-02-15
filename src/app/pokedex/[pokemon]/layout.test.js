import { render, screen } from "@testing-library/react";
import Layout from "./layout";

jest.mock("@/services/getAllPokemon", () => ({
  getAllPokemon: jest.fn(),
}));

jest.mock("./components/pokemonList", () => {
  return ({ pokemons }) => (
    <div data-testid="pokemon-list-mock">{pokemons?.length}</div>
  );
});

import { getAllPokemon } from "@/services/getAllPokemon";

describe("Pokedex pokemon layout", () => {
  it("renders list and slot sections", async () => {
    getAllPokemon.mockResolvedValueOnce({
      data: [{ name: "Bulbasaur" }, { name: "Ivysaur" }],
    });

    render(
      await Layout({
        info: <div data-testid="info-slot" />,
        details: <div data-testid="details-slot" />,
        header: <div data-testid="header-slot" />,
      })
    );

    expect(screen.getByTestId("pokedex-container")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-list-mock")).toHaveTextContent("2");
    expect(screen.getByTestId("header-slot")).toBeInTheDocument();
    expect(screen.getByTestId("info-slot")).toBeInTheDocument();
    expect(screen.getByTestId("details-slot")).toBeInTheDocument();
  });
});
