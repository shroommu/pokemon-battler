import { render, screen } from "@testing-library/react";
import LabeledElement from "../LabeledElement";

describe("pokedexEntry", () => {
  it("renders", () => {
    const { container } = render(<LabeledElement />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("adds a star if required", () => {
    render(
      <LabeledElement label="Search" childId="text-input" required>
        <input id="text-input" />
      </LabeledElement>
    );

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/\*/)).toBeInTheDocument();
  });
});
