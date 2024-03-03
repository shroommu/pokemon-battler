import { render } from "@testing-library/react";
import Button from "../Button";

describe("pokedexEntry", () => {
  it("renders", () => {
    const { container } = render(<Button />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
