import { render, screen } from "@testing-library/react";
import Moves from ".././moves";

jest.mock("@/components/TypePill", () => {
  return ({ typeName }) => <span>{typeName}</span>;
});

describe("Moves", () => {
  it("renders sorted move rows and fallback values", () => {
    render(
      <Moves
        pokemon={{
          name: "Mr Mime",
          pokemon_moves: [
            {
              move: {
                name: "Psychic",
                type: { name: "Psychic" },
                power: 90,
                accuracy: 100,
                pp: 10,
                effect: "Damage",
              },
            },
            {
              move: {
                name: "Barrier",
                type: { name: "Psychic" },
                power: null,
                accuracy: null,
                pp: null,
                effect: "Raises defense",
              },
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId("mr-mime-pokemon-moves")).toBeInTheDocument();
    expect(screen.getByTestId("move-table")).toBeInTheDocument();
    expect(screen.getByTestId("move-row-1")).toHaveTextContent("Barrier");
    expect(screen.getByTestId("move-row-2")).toHaveTextContent("Psychic");
    expect(screen.getByTestId("move-row-1")).toHaveTextContent("--");
  });
});
