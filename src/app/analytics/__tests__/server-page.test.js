import { render, screen } from "@testing-library/react";
import Page from "../page";

jest.mock("@/services/getAllPokemonWithMaxStats", () => ({
  getAllPokemonWithMaxStats: jest.fn(),
}));

jest.mock("../AnalyticsClient", () => ({
  __esModule: true,
  default: ({ pokemonData }) => (
    <div
      data-testid="analytics-client"
      data-pokemon-count={pokemonData.length}
    />
  ),
}));

import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

describe("Analytics server page", () => {
  it("fetches data and passes it to AnalyticsClient", async () => {
    getAllPokemonWithMaxStats.mockResolvedValueOnce({
      data: [
        { name: "Charizard", max_stats: 525 },
        { name: "Squirtle", max_stats: 314 },
      ],
    });

    render(await Page());

    expect(getAllPokemonWithMaxStats).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("analytics-client")).toHaveAttribute(
      "data-pokemon-count",
      "2"
    );
  });

  it("passes an empty list when service data is missing", async () => {
    getAllPokemonWithMaxStats.mockResolvedValueOnce({});

    render(await Page());

    expect(screen.getByTestId("analytics-client")).toHaveAttribute(
      "data-pokemon-count",
      "0"
    );
  });
});
