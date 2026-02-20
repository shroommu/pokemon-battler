import { render, screen } from "@testing-library/react";
import UIPlayground from ".././page";

jest.mock("@/components/charts/Histogram/Histogram", () => () => (
  <div data-testid="histogram-mock" />
));

jest.mock("@/components/charts/ScatterPlot/ScatterPlot", () => () => (
  <div data-testid="scatter-plot-mock" />
));

describe("UIPlayground", () => {
  it("renders chart playground components", () => {
    render(<UIPlayground />);

    expect(screen.getByTestId("scatter-plot-mock")).toBeInTheDocument();
    expect(screen.getByTestId("histogram-mock")).toBeInTheDocument();
  });
});
