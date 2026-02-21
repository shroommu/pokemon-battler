import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Stats from ".././stats";

const horizontalChartMock = jest.fn(() => <div data-testid="horizontal-chart" />);
const verticalChartMock = jest.fn(() => <div data-testid="vertical-chart" />);
const starChartMock = jest.fn(() => <div data-testid="star-chart" />);

jest.mock("@/components/charts/HorizontalBarChart/HorizontalBarChart", () => {
  return (props) => horizontalChartMock(props);
});

jest.mock("@/components/charts/VerticalBarChart/VerticalBarChart", () => {
  return (props) => verticalChartMock(props);
});

jest.mock("@/components/charts/StarChart/StarChart", () => {
  return (props) => starChartMock(props);
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

describe("details Stats component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders charts and compares to all pokemon", async () => {
    getAllPokemonAverageStats.mockResolvedValueOnce({
      data: { hp: 60, attack: 62, defense: 63, special: 80, speed: 70 },
    });

    const user = userEvent.setup();
    render(
      <Stats
        pokemon={{
          name: "Charizard",
          hp: 78,
          attack: 84,
          defense: 78,
          special: 85,
          speed: 100,
          primary_type: { name: "Fire", display_color: "#f42" },
          secondary_type: { name: "Flying", display_color: "#89f" },
        }}
      />
    );

    const lastHorizontalProps =
      horizontalChartMock.mock.calls[horizontalChartMock.mock.calls.length - 1][0];
    const lastVerticalProps =
      verticalChartMock.mock.calls[verticalChartMock.mock.calls.length - 1][0];
    const lastStarProps = starChartMock.mock.calls[starChartMock.mock.calls.length - 1][0];
    expect(lastHorizontalProps.barFillGradient).toEqual({
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      stops: [
        { offset: "0%", color: "#f42" },
        { offset: "47%", color: "#f42" },
        { offset: "53%", color: "#89f" },
        { offset: "100%", color: "#89f" },
      ],
    });
    expect(lastStarProps.fillGradient).toEqual({
      type: "radial",
      cx: "50%",
      cy: "50%",
      r: "60%",
      stops: [
        { offset: "0%", color: "#89f" },
        { offset: "44%", color: "#89f" },
        { offset: "56%", color: "#f42" },
        { offset: "100%", color: "#f42" },
      ],
    });
    expect(lastVerticalProps.barFillGradient).toEqual({
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "100%",
      stops: [
        { offset: "0%", color: "#f42" },
        { offset: "47%", color: "#f42" },
        { offset: "53%", color: "#89f" },
        { offset: "100%", color: "#89f" },
      ],
    });

    expect(screen.getByTestId("stats-chart-title")).toHaveTextContent("Max Stats");
    expect(screen.getByTestId("star-chart")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All Pokemon" }));

    await waitFor(() => {
      expect(getAllPokemonAverageStats).toHaveBeenCalledTimes(1);
      const lastStarProps = starChartMock.mock.calls[starChartMock.mock.calls.length - 1][0];
      expect(lastStarProps.showReferenceStar).toBe(true);
      expect(lastStarProps.data[0].referenceLine).toBe(60);
    });
  });

  it("compares by type and hides secondary button when absent", async () => {
    getPokemonTypeAverageStats.mockResolvedValue({
      data: { hp: 1, attack: 1, defense: 1, special: 1, speed: 1 },
    });

    const user = userEvent.setup();
    render(
      <Stats
        pokemon={{
          name: "Pikachu",
          hp: 35,
          attack: 55,
          defense: 30,
          special: 50,
          speed: 90,
          primary_type: { name: "Electric", display_color: "#fc3" },
          secondary_type: null,
        }}
      />
    );

    const lastHorizontalProps =
      horizontalChartMock.mock.calls[horizontalChartMock.mock.calls.length - 1][0];
    const lastVerticalProps =
      verticalChartMock.mock.calls[verticalChartMock.mock.calls.length - 1][0];
    const lastStarProps = starChartMock.mock.calls[starChartMock.mock.calls.length - 1][0];
    expect(lastHorizontalProps.barFillGradient).toBeUndefined();
    expect(lastVerticalProps.barFillGradient).toBeUndefined();
    expect(lastStarProps.fillGradient).toBeUndefined();

    expect(screen.getByRole("button", { name: "All Electric Types" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /All .* Types/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /All null Types/i })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All Electric Types" }));

    await waitFor(() => {
      expect(getPokemonTypeAverageStats).toHaveBeenCalledWith("Electric");
    });
  });

  it("uses fallback stat values and supports secondary type compare", async () => {
    getPokemonTypeAverageStats.mockResolvedValueOnce({
      data: { hp: 2, attack: 2, defense: 2, special: 2, speed: 2 },
    });

    const user = userEvent.setup();
    render(
      <Stats
        pokemon={{
          name: "Testmon",
          primary_type: { name: "Normal", display_color: "#aaa" },
          secondary_type: { name: "Ghost", display_color: "#777" },
        }}
      />
    );

    const firstStarProps = starChartMock.mock.calls[starChartMock.mock.calls.length - 1][0];
    expect(firstStarProps.data.map((d) => d.value)).toEqual([0, 0, 0, 0, 0]);

    await user.click(screen.getByRole("button", { name: "All Ghost Types" }));

    await waitFor(() => {
      expect(getPokemonTypeAverageStats).toHaveBeenCalledWith("Ghost");
      const latestStarProps = starChartMock.mock.calls[starChartMock.mock.calls.length - 1][0];
      expect(latestStarProps.showReferenceStar).toBe(true);
    });
  });

  it("reuses cached all-pokemon averages on repeated compare", async () => {
    getAllPokemonAverageStats.mockResolvedValueOnce({
      data: { hp: 60, attack: 62, defense: 63, special: 80, speed: 70 },
    });

    const user = userEvent.setup();
    render(
      <Stats
        pokemon={{
          name: "Charizard",
          hp: 78,
          attack: 84,
          defense: 78,
          special: 85,
          speed: 100,
          primary_type: { name: "Fire", display_color: "#f42" },
          secondary_type: { name: "Flying", display_color: "#89f" },
        }}
      />
    );

    await user.click(screen.getByRole("button", { name: "All Pokemon" }));
    await user.click(screen.getByRole("button", { name: "All Pokemon" }));

    await waitFor(() => {
      expect(getAllPokemonAverageStats).toHaveBeenCalledTimes(1);
    });
  });
});
