import { render, screen } from "@testing-library/react";
import CompareHeader from "../CompareHeader";

describe("CompareHeader", () => {
  it("renders selected pokemon cards with details", () => {
    render(
      <CompareHeader
        pokemonA={{
          name: "Bulbasaur",
          pokedexNumber: 1,
          sprite: "/images/pokemon/sprites/front/bulbasaur.png",
          types: ["Grass", "Poison"],
        }}
        pokemonB={{
          name: "Charmander",
          pokedexNumber: 4,
          sprite: "/images/pokemon/sprites/front/charmander.png",
          types: ["Fire"],
        }}
      />
    );

    expect(screen.getByTestId("compare-a-card")).toBeInTheDocument();
    expect(screen.getByTestId("compare-b-card")).toBeInTheDocument();
    expect(screen.getByTestId("compare-a-name")).toHaveTextContent("#001 Bulbasaur");
    expect(screen.getByTestId("compare-b-name")).toHaveTextContent("#004 Charmander");
    expect(screen.getByTestId("Grass-type-pill")).toBeInTheDocument();
    expect(screen.getByTestId("Poison-type-pill")).toBeInTheDocument();
    expect(screen.getByTestId("Fire-type-pill")).toBeInTheDocument();
  });

  it("renders empty cards when pokemon are not selected", () => {
    render(<CompareHeader pokemonA={null} pokemonB={null} />);

    expect(screen.getByTestId("compare-a-card-empty")).toBeInTheDocument();
    expect(screen.getByTestId("compare-b-card-empty")).toBeInTheDocument();
  });
});
