import { render } from "@testing-library/react";
import PokedexEntrySkeleton from "../pokedexEntrySkeleton";

describe("pokedexEntry", () => {
  it("renders", () => {
    const { container } = render(<PokedexEntrySkeleton />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
