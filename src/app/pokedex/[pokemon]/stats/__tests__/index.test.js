import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonDataEntry from ".././index";

const horizontalChartMock = jest.fn(() => <div data-testid="horizontal-chart" />);
const verticalChartMock = jest.fn(() => <div data-testid="vertical-chart" />);

jest.mock("@/components/charts/HorizontalBarChart/HorizontalBarChart", () => {
  return (props) => horizontalChartMock(props);
});

jest.mock("@/components/charts/VerticalBarChart/VerticalBarChart", () => {
  return (props) => verticalChartMock(props);
});

jest.mock("@/hooks/useDimensions", () => ({
  useDimensions: () => ({ width: 320, height: 240 }),
}));

jest.mock("@/services/getAllPokemonAverageStats", () => ({
  getAllPokemonAverageStats: jest.fn(),
}));

jest.mock("@/services/getPokemonTypeAverageStats", () => ({
  getPokemonTypeAverageStats: jest.fn(),
}));

jest.mock("tinycolor2", () => jest.fn(() => ({ lighten: () => "#cccccc" })));

import { getAllPokemonAverageStats } from "@/services/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/services/getPokemonTypeAverageStats";

describe("PokemonDataEntry", () => {
  const pokemon = {
    name: "Charizard",
    hp: 78,
    attack: 84,
    defense: 78,
    special: 85,
    speed: 100,
    primary_type: { name: "Fire", display_color: "#f42" },
    secondary_type: { name: "Flying", display_color: "#89f" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders compare controls and toggles reference line for all pokemon", async () => {
    getAllPokemonAverageStats.mockResolvedValueOnce({
      data: { hp: 60, attack: 62, defense: 63, special: 80, speed: 70 },
    });

    const user = userEvent.setup();
    render(<PokemonDataEntry pokemon={pokemon} />);

    expect(screen.getByTestId("stats-chart-title")).toHaveTextContent("Stats");
    expect(
      screen.getByRole("button", { name: "All Flying Types" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All Pokemon" }));

    await waitFor(() => {
      expect(getAllPokemonAverageStats).toHaveBeenCalledTimes(1);
      const lastHorizontalProps =
        horizontalChartMock.mock.calls[horizontalChartMock.mock.calls.length - 1][0];
      expect(lastHorizontalProps.showReferenceLine).toBe(true);
      expect(lastHorizontalProps.data[0].referenceLine).toBe(60);
    });
  });

  it("requests primary and secondary type averages", async () => {
    getPokemonTypeAverageStats.mockResolvedValue({
      data: { hp: 1, attack: 1, defense: 1, special: 1, speed: 1 },
    });

    const user = userEvent.setup();
    render(<PokemonDataEntry pokemon={pokemon} />);

    await user.click(screen.getByRole("button", { name: "All Fire Types" }));
    await user.click(screen.getByRole("button", { name: "All Flying Types" }));

    await waitFor(() => {
      expect(getPokemonTypeAverageStats).toHaveBeenNthCalledWith(1, "Fire");
      expect(getPokemonTypeAverageStats).toHaveBeenNthCalledWith(2, "Flying");
    });
  });

  it("uses fallback stat values and hides secondary button when absent", () => {
    render(
      <PokemonDataEntry
        pokemon={{
          name: "Fallbackmon",
          primary_type: { name: "Normal", display_color: "#aaa" },
          secondary_type: null,
        }}
      />
    );

    const latestHorizontalProps =
      horizontalChartMock.mock.calls[horizontalChartMock.mock.calls.length - 1][0];

    expect(latestHorizontalProps.data.map((d) => d.value)).toEqual([0, 0, 0, 0, 0]);
    expect(screen.queryByRole("button", { name: /All .* Types/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /All null Types/i })
    ).not.toBeInTheDocument();
  });

  it("reuses cached type averages on repeated compare", async () => {
    getPokemonTypeAverageStats.mockResolvedValue({
      data: { hp: 1, attack: 1, defense: 1, special: 1, speed: 1 },
    });

    const user = userEvent.setup();
    render(<PokemonDataEntry pokemon={pokemon} />);

    await user.click(screen.getByRole("button", { name: "All Fire Types" }));
    await user.click(screen.getByRole("button", { name: "All Fire Types" }));

    await waitFor(() => {
      expect(getPokemonTypeAverageStats).toHaveBeenCalledTimes(1);
      expect(getPokemonTypeAverageStats).toHaveBeenCalledWith("Fire");
    });
  });
});
