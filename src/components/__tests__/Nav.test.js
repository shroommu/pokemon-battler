import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

describe("pokedexEntry", () => {
  it("renders", () => {
    const { container } = render(<Nav />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("renders nav buttons with stable test ids", () => {
    render(<Nav />);

    expect(screen.getByTestId("nav-button-home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-button-pokedex")).toBeInTheDocument();
    expect(screen.getByTestId("nav-button-analyze")).toBeInTheDocument();
  });
});
