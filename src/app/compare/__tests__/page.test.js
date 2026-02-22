import { render, screen } from "@testing-library/react";
import ComparePage from "../page";

jest.mock("../data", () => ({
  getComparePokemonOptions: jest.fn(),
  getComparePokemonByName: jest.fn(),
  getPokemonNameFromSlug: jest.fn(),
}));

jest.mock("../CompareClient", () => ({
  __esModule: true,
  default: ({ pokemonOptions, initialA, initialB, pokemonA, pokemonB }) => (
    <div
      data-testid="compare-client"
      data-options-count={pokemonOptions.length}
      data-initial-a={initialA}
      data-initial-b={initialB}
      data-pokemon-a={pokemonA?.name ?? ""}
      data-pokemon-b={pokemonB?.name ?? ""}
    />
  ),
}));

import {
  getComparePokemonByName,
  getComparePokemonOptions,
  getPokemonNameFromSlug,
} from "../data";

describe("ComparePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches options and passes query-param selections to client", async () => {
    getComparePokemonOptions.mockResolvedValueOnce([
      { id: "001", name: "Bulbasaur" },
      { id: "004", name: "Charmander" },
    ]);
    getPokemonNameFromSlug
      .mockReturnValueOnce("Bulbasaur")
      .mockReturnValueOnce("Charmander");
    getComparePokemonByName
      .mockResolvedValueOnce({ name: "Bulbasaur" })
      .mockResolvedValueOnce({ name: "Charmander" });

    render(await ComparePage({ searchParams: { a: "bulbasaur", b: "charmander" } }));

    expect(screen.getByTestId("compare-client")).toHaveAttribute(
      "data-options-count",
      "2"
    );
    expect(screen.getByTestId("compare-client")).toHaveAttribute(
      "data-initial-a",
      "bulbasaur"
    );
    expect(screen.getByTestId("compare-client")).toHaveAttribute(
      "data-initial-b",
      "charmander"
    );
    expect(screen.getByTestId("compare-client")).toHaveAttribute(
      "data-pokemon-a",
      "Bulbasaur"
    );
    expect(screen.getByTestId("compare-client")).toHaveAttribute(
      "data-pokemon-b",
      "Charmander"
    );
  });

  it("does not fetch duplicate second pokemon", async () => {
    getComparePokemonOptions.mockResolvedValueOnce([{ id: "001", name: "Bulbasaur" }]);
    getPokemonNameFromSlug
      .mockReturnValueOnce("Bulbasaur")
      .mockReturnValueOnce("Bulbasaur");
    getComparePokemonByName.mockResolvedValueOnce({ name: "Bulbasaur" });

    render(await ComparePage({ searchParams: { a: "bulbasaur", b: "bulbasaur" } }));

    expect(getComparePokemonByName).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("compare-client")).toHaveAttribute("data-pokemon-a", "Bulbasaur");
    expect(screen.getByTestId("compare-client")).toHaveAttribute("data-pokemon-b", "");
  });
});
