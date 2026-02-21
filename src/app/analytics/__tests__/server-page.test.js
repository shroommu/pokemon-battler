import { render, screen } from "@testing-library/react";
import Page from "../page";

jest.mock("@/services/getAllPokemonWithMaxStats", () => ({
  getAllPokemonWithMaxStats: jest.fn(),
}));

jest.mock("../AnalyticsClient", () => ({
  __esModule: true,
  default: ({ pokemonData, selectedSection }) => (
    <div
      data-testid="analytics-client"
      data-pokemon-count={pokemonData.length}
      data-selected-section={selectedSection}
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
    expect(screen.getByTestId("analytics-client")).toHaveAttribute(
      "data-selected-section",
      "overview"
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

  it("passes section from search params", async () => {
    getAllPokemonWithMaxStats.mockResolvedValueOnce({ data: [] });

    render(await Page({ searchParams: { section: "distribution" } }));

    expect(screen.getByTestId("analytics-client")).toHaveAttribute(
      "data-selected-section",
      "distribution"
    );
  });
});
