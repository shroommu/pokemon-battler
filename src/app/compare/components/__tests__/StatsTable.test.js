import { render, screen } from "@testing-library/react";
import StatsTable from "../StatsTable";

const bulbasaur = {
  name: "Bulbasaur",
  stats: {
    hp: 45,
    attack: 49,
    defense: 49,
    special: 65,
    speed: 45,
    total: 318,
  },
};

const charmander = {
  name: "Charmander",
  stats: {
    hp: 39,
    attack: 52,
    defense: 43,
    special: 60,
    speed: 65,
    total: 309,
  },
};

describe("StatsTable", () => {
  it("renders stats table for both selected pokemon", () => {
    render(<StatsTable pokemonA={bulbasaur} pokemonB={charmander} />);

    expect(screen.getByTestId("compare-stats-table")).toBeInTheDocument();
    expect(screen.getByTestId("compare-stat-row-hp")).toBeInTheDocument();
    expect(screen.getByTestId("compare-stat-row-total")).toBeInTheDocument();
  });

  it("shows winner per stat and tie label", () => {
    render(
      <StatsTable
        pokemonA={bulbasaur}
        pokemonB={{
          ...charmander,
          stats: { ...charmander.stats, defense: 49 },
        }}
      />
    );

    expect(screen.getByTestId("compare-stat-winner-hp")).toHaveTextContent("Bulbasaur");
    expect(screen.getByTestId("compare-stat-winner-attack")).toHaveTextContent("Charmander");
    expect(screen.getByTestId("compare-stat-winner-defense")).toHaveTextContent("Tie");
  });

  it("renders null when one side is missing", () => {
    const { container } = render(<StatsTable pokemonA={bulbasaur} pokemonB={null} />);

    expect(container).toBeEmptyDOMElement();
  });
});
