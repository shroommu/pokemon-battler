import { render, screen } from "@testing-library/react";
import UIPlayground from ".././page";

jest.mock("@/services/getAllPokemonWithMaxStats", () => ({
  getAllPokemonWithMaxStats: jest.fn(),
}));

jest.mock("../UIPlaygroundClient", () => ({
  __esModule: true,
  default: ({ pokemonData }) => (
    <div data-testid="ui-playground-client" data-pokemon-count={pokemonData.length} />
  ),
}));

import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

describe("UIPlayground", () => {
  it("fetches data and passes it to UIPlaygroundClient", async () => {
    getAllPokemonWithMaxStats.mockResolvedValueOnce({
      data: [
        { id: "1", name: "Bulbasaur", max_stats: 318 },
        { id: "2", name: "Charizard", max_stats: 534 },
      ],
    });

    render(await UIPlayground());

    expect(getAllPokemonWithMaxStats).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("ui-playground-client")).toHaveAttribute(
      "data-pokemon-count",
      "2"
    );
  });

  it("passes an empty list when service data is missing", async () => {
    getAllPokemonWithMaxStats.mockResolvedValueOnce({});

    render(await UIPlayground());

    expect(screen.getByTestId("ui-playground-client")).toHaveAttribute(
      "data-pokemon-count",
      "0"
    );
  });
});
