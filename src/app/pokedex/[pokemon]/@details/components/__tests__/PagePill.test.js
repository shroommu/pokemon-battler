import { render, screen } from "@testing-library/react";
import PagePill from ".././PagePill";

describe("PagePill", () => {
  it("renders text, selected style, and href", () => {
    render(<PagePill text="Moves" href="/pokedex/pikachu/moves" selected />);

    const pill = screen.getByRole("link", { name: "Moves" });
    expect(pill).toHaveClass("bg-gray-400");
    expect(pill).toHaveAttribute("href", "/pokedex/pikachu/moves");
  });
});
