import { render } from "@testing-library/react";
import Nav from "../Nav";

describe("pokedexEntry", () => {
  it("renders", () => {
    const { container } = render(<Nav />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
