import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

describe("pokedexEntry", () => {
  it("renders", () => {
    const { container } = render(<Nav />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("renders nav links with accessible names", () => {
    render(<Nav />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pokedex" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Analyze" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Compare" })).toBeInTheDocument();
  });
});
