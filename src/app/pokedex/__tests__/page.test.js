import { render, screen } from "@testing-library/react";
import Page from ".././page";

jest.mock("@/services/getAllPokemon", () => ({
  getAllPokemon: jest.fn(),
}));

jest.mock(".././components/pokedexButton", () => {
  return ({ pokemon, href }) => (
    <li data-testid={`${pokemon.name}-button`} data-href={href}>
      {pokemon.name}
    </li>
  );
});

import { getAllPokemon } from "@/services/getAllPokemon";

describe("Pokedex page", () => {
  it("renders pokemon list buttons from fetched data", async () => {
    getAllPokemon.mockResolvedValueOnce({
      data: [
        { name: "Mr Mime", pokedex_number: 122 },
        { name: "Pikachu", pokedex_number: 25 },
      ],
    });

    render(await Page());

    expect(screen.getByTestId("pokedex-home-page-container")).toBeInTheDocument();
    expect(screen.getByTestId("Mr Mime-button")).toHaveAttribute(
      "data-href",
      "/pokedex/mr-mime"
    );
    expect(screen.getByTestId("Pikachu-button")).toBeInTheDocument();
  });
});
