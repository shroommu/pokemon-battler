import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import PokedexEntry from "../pokedexEntry";

describe("pokedexEntry", () => {
  let pokemon;

  beforeEach(() => {
    pokemon = {
      pokedex_number: 25,
      name: "Pikachu",
      sprite_front_filepath: "/images/pikachu.png",
      primary_type: { name: "Electric" },
      pokemon_moves: [
        { move: { name: "Tackle", type: { name: "Normal" } } },
        { move: { name: "Thundershock", type: { name: "Electric" } } },
      ],
    };
  });

  it("renders", () => {
    const { container } = render(<PokedexEntry pokemon={pokemon} />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("doesn't blow up if pokemon data does not exist", () => {
    pokemon = null;
    const { container } = render(<PokedexEntry pokemon={pokemon} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders a single type", () => {
    render(<PokedexEntry pokemon={pokemon} />);

    const typeDiv = screen.getByTestId("pokemon-type");
    expect(within(typeDiv).getByTestId("Electric-pill")).toBeInTheDocument();
  });

  it("renders a dual type", () => {
    pokemon.secondary_type = { name: "Normal" };
    render(<PokedexEntry pokemon={pokemon} />);

    const typeDiv = screen.getByTestId("pokemon-type");
    expect(within(typeDiv).getByTestId("Electric-pill")).toBeInTheDocument();
    expect(within(typeDiv).getByTestId("Normal-pill")).toBeInTheDocument();
  });

  it("sorts the move data correctly if out of order", () => {
    pokemon.pokemon_moves = [
      { move: { name: "Thundershock", type: { name: "Electric" } } },
      { move: { name: "Tackle", type: { name: "Normal" } } },
    ];

    render(<PokedexEntry pokemon={pokemon} />);

    const moveTable = screen.getByTestId("move-table");
    expect(moveTable.children.item(1).children).toHaveLength(2);
    expect(moveTable.children.item(1).children.item(0)).toHaveTextContent(
      /Tackle/
    );
    expect(moveTable.children.item(1).children.item(1)).toHaveTextContent(
      /Thundershock/
    );
  });

  it("correctly sorts identical moves", () => {
    pokemon.pokemon_moves = [
      { move: { name: "Tackle", type: { name: "Normal" } } },
      { move: { name: "Tackle", type: { name: "Normal" } } },
    ];

    render(<PokedexEntry pokemon={pokemon} />);

    const moveTable = screen.getByTestId("move-table");
    expect(moveTable.children.item(1).children).toHaveLength(2);
    expect(moveTable.children.item(1).children.item(0)).toHaveTextContent(
      /Tackle/
    );
    expect(moveTable.children.item(1).children.item(1)).toHaveTextContent(
      /Tackle/
    );
  });
});
