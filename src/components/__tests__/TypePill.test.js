import { render } from "@testing-library/react";
import TypePill from "../TypePill";

describe("TypePill", () => {
  const typeName = "Normal";

  it("renders", () => {
    const { container } = render(<TypePill typeName={typeName} />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("renders compact label when compact is true", () => {
    const { getByText } = render(<TypePill typeName={typeName} compact />);

    expect(getByText("Nor")).toBeInTheDocument();
  });
});
