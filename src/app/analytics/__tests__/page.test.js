import { render, waitFor } from "@testing-library/react";
import Analytics from ".././page";

const horizontalBoxPlotMock = jest.fn(() => <div data-testid="horizontal-boxplot" />);
const verticalBoxPlotMock = jest.fn(() => <div data-testid="vertical-boxplot" />);

jest.mock("next/image", () => {
  return ({ fill, priority, unoptimized, preload, ...props }) => <img {...props} />;
});

jest.mock("@/hooks/useDimensions", () => ({
  useDimensions: () => ({ width: 500, height: 300 }),
}));

jest.mock("@/services/getAllPokemonWithMaxStats", () => ({
  getAllPokemonWithMaxStats: jest.fn(),
}));

jest.mock("@/utils/getBoxplotData", () => ({
  getBoxplotData: jest.fn((points) => ({ dataPoints: points })),
}));

jest.mock("@/components/charts/BoxPlot/HorizontalBoxPlot", () => {
  return (props) => horizontalBoxPlotMock(props);
});

jest.mock("@/components/charts/BoxPlot/VerticalBoxPlot", () => {
  return (props) => verticalBoxPlotMock(props);
});

import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";
import { getBoxplotData } from "@/utils/getBoxplotData";

describe("Analytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads pokemon data and passes grouped boxplot data to charts", async () => {
    getAllPokemonWithMaxStats.mockResolvedValueOnce({
      data: [
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
      ],
    });

    render(<Analytics />);

    await waitFor(() => {
      expect(getAllPokemonWithMaxStats).toHaveBeenCalledTimes(1);
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
    getAllPokemonWithMaxStats.mockResolvedValueOnce({
      data: [
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
      ],
    });

    render(<Analytics />);

    await waitFor(() => {
      expect(getAllPokemonWithMaxStats).toHaveBeenCalledTimes(1);
      expect(horizontalBoxPlotMock).toHaveBeenCalled();
      expect(verticalBoxPlotMock).toHaveBeenCalled();
    });

    expect(getBoxplotData).toHaveBeenCalled();
  });
});
