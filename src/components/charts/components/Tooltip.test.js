import { render, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("returns null when no interaction data is provided", () => {
    const { container } = render(<Tooltip position="top" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders tooltip content and coordinates for top and bottom", () => {
    const interactionData = {
      xPos: 100,
      yPos: 50,
      children: <span>Value</span>,
    };

    const { rerender } = render(
      <Tooltip interactionData={interactionData} position="top" />
    );
    expect(screen.getByTestId("tooltip-container")).toHaveStyle({
      left: "100px",
      top: "50px",
    });
    expect(screen.getByText("Value")).toBeInTheDocument();

    rerender(<Tooltip interactionData={interactionData} position="bottom" />);
    expect(screen.getByTestId("tooltip-container")).toHaveStyle({
      left: "100px",
      bottom: "50px",
    });
  });
});
