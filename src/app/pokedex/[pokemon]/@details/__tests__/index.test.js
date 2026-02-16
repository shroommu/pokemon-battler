import { render, screen } from "@testing-library/react";
import Details from ".././index";

jest.mock(".././components/moves", () => () => <div data-testid="moves-content" />);
jest.mock(".././components/stats", () => () => <div data-testid="stats-content" />);
jest.mock(".././components/PagePill", () => {
  return ({ text, href, selected }) => (
    <a href={href} data-selected={selected ? "true" : "false"}>
      {text}
    </a>
  );
});

describe("Details tabs", () => {
  it("renders moves tab content and link selection", () => {
    render(
      <Details
        pokemon={{ name: "Pikachu" }}
        pokemonSlug="pikachu"
        selectedTab="Moves"
      />,
    );

    expect(screen.getByTestId("moves-content")).toBeInTheDocument();
    expect(screen.queryByTestId("stats-content")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Moves" })).toHaveAttribute(
      "href",
      "/pokedex/pikachu/moves",
    );
    expect(screen.getByRole("link", { name: "Moves" })).toHaveAttribute(
      "data-selected",
      "true",
    );
  });

  it("renders stats tab content and link selection", () => {
    render(
      <Details
        pokemon={{ name: "Pikachu" }}
        pokemonSlug="pikachu"
        selectedTab="Stats"
      />,
    );

    expect(screen.getByTestId("stats-content")).toBeInTheDocument();
    expect(screen.queryByTestId("moves-content")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Stats" })).toHaveAttribute(
      "href",
      "/pokedex/pikachu/stats",
    );
    expect(screen.getByRole("link", { name: "Stats" })).toHaveAttribute(
      "data-selected",
      "true",
    );
  });
});
