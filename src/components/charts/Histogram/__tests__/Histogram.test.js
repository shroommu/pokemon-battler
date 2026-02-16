import { render, screen } from "@testing-library/react";
import Histogram from ".././Histogram";

describe("Histogram", () => {
  it("renders placeholder container", () => {
    render(<Histogram />);
    expect(screen.getByTestId("histogram-container")).toBeInTheDocument();
  });
});
