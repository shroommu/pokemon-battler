import { render, waitFor } from "@testing-library/react";
import AnalyticsClient from "../AnalyticsClient";

const horizontalBoxPlotMock = jest.fn(() => <div data-testid="horizontal-boxplot" />);
const verticalBoxPlotMock = jest.fn(() => <div data-testid="vertical-boxplot" />);
const histogramMock = jest.fn(() => <div data-testid="histogram" />);
const scatterPlotMock = jest.fn(() => <div data-testid="scatter-plot" />);

jest.mock("next/image", () => {
  return ({ fill, priority, unoptimized, preload, ...props }) => <img {...props} />;
});

jest.mock("@/hooks/useDimensions", () => ({
  useDimensions: () => ({ width: 500, height: 300 }),
}));

jest.mock("@/utils", () => ({
  getBoxplotData: jest.fn((points) => ({ dataPoints: points })),
  getHistogramData: jest.fn(() => []),
  getScatterPlotData: jest.fn(() => []),
}));

jest.mock("@/components/charts/BoxPlot/HorizontalBoxPlot", () => {
  return (props) => horizontalBoxPlotMock(props);
});

jest.mock("@/components/charts/BoxPlot/VerticalBoxPlot", () => {
  return (props) => verticalBoxPlotMock(props);
});

jest.mock("@/components/charts/Histogram/Histogram", () => {
  return (props) => histogramMock(props);
});

jest.mock("@/components/charts/ScatterPlot/ScatterPlot", () => {
  return (props) => scatterPlotMock(props);
});

import { getBoxplotData } from "@/utils";

describe("Analytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("passes grouped boxplot data to distribution charts", async () => {
    const pokemonData = [
      {
        name: "Charizard",
        max_stats: 525,
        sprite_party_filepath: "/images/pokemon/sprites/party/charizard.png",
        primary_type: { name: "Fire" },
        secondary_type: { name: "Flying" },
      },
      {
        name: "Squirtle",
        max_stats: 314,
        sprite_party_filepath: "/images/pokemon/sprites/party/squirtle.png",
        primary_type: { name: "Water" },
        secondary_type: null,
      },
    ];

    render(<AnalyticsClient pokemonData={pokemonData} selectedSection="distribution" />);

    await waitFor(() => {
      expect(horizontalBoxPlotMock).toHaveBeenCalled();
      expect(verticalBoxPlotMock).toHaveBeenCalled();
    });

    const lastHorizontalProps =
      horizontalBoxPlotMock.mock.calls[horizontalBoxPlotMock.mock.calls.length - 1][0];
    expect(lastHorizontalProps.width).toBe(500);
    expect(lastHorizontalProps.height).toBe(300);
    expect(lastHorizontalProps.filterList).toContain("Fire");
    expect(lastHorizontalProps.filterList).toContain("Water");
    expect(lastHorizontalProps.valueKey).toBe("max_stats");

    expect(getBoxplotData).toHaveBeenCalled();
  });

  it("handles empty and mixed secondary type data without crashing", async () => {
    const pokemonData = [
      {
        name: "Magnemite",
        max_stats: 325,
        sprite_party_filepath: "/images/pokemon/sprites/party/magnemite.png",
        primary_type: { name: "Electric" },
        secondary_type: { name: "Steel" },
      },
      {
        name: "Ditto",
        max_stats: 288,
        sprite_party_filepath: "/images/pokemon/sprites/party/ditto.png",
        primary_type: { name: "Normal" },
        secondary_type: undefined,
      },
    ];

    render(<AnalyticsClient pokemonData={pokemonData} selectedSection="distribution" />);

    await waitFor(() => {
      expect(horizontalBoxPlotMock).toHaveBeenCalled();
      expect(verticalBoxPlotMock).toHaveBeenCalled();
    });

    expect(getBoxplotData).toHaveBeenCalled();
  });

  it("renders overview charts by default", async () => {
    render(<AnalyticsClient pokemonData={[]} />);

    await waitFor(() => {
      expect(histogramMock).toHaveBeenCalled();
    });

    expect(scatterPlotMock).not.toHaveBeenCalled();
  });

  it("renders distribution chart with non-zero dimensions after section switch", async () => {
    const pokemonData = [
      {
        name: "Charizard",
        max_stats: 525,
        sprite_party_filepath: "/images/pokemon/sprites/party/charizard.png",
        primary_type: { name: "Fire" },
        secondary_type: { name: "Flying" },
      },
    ];

    const { rerender } = render(
      <AnalyticsClient pokemonData={pokemonData} selectedSection="overview" />,
    );

    await waitFor(() => {
      expect(histogramMock).toHaveBeenCalled();
    });

    rerender(
      <AnalyticsClient pokemonData={pokemonData} selectedSection="distribution" />,
    );

    await waitFor(() => {
      expect(horizontalBoxPlotMock).toHaveBeenCalled();
      expect(verticalBoxPlotMock).toHaveBeenCalled();
    });

    const horizontalCall =
      horizontalBoxPlotMock.mock.calls[horizontalBoxPlotMock.mock.calls.length - 1][0];
    const verticalCall =
      verticalBoxPlotMock.mock.calls[verticalBoxPlotMock.mock.calls.length - 1][0];

    expect(horizontalCall.width).toBeGreaterThan(0);
    expect(horizontalCall.height).toBeGreaterThan(0);
    expect(verticalCall.width).toBeGreaterThan(0);
    expect(verticalCall.height).toBeGreaterThan(0);
  });
});
