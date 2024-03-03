import { render } from "@testing-library/react";
import TypePill from "../TypePill";

describe("TypePill", () => {
  const typeName = "Normal";

  it("renders", () => {
    const { container } = render(<TypePill typeName={typeName} />);

    expect(container).not.toBeEmptyDOMElement();
  });
});
