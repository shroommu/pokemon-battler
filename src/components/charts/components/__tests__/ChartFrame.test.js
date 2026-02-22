import { render, screen } from "@testing-library/react";
import ChartFrame from "../ChartFrame";

describe("ChartFrame", () => {
  it("renders children without a header when no title or subtitle are provided", () => {
    render(
      <ChartFrame ariaLabel="Overview chart">
        <div data-testid="chart-content">chart body</div>
      </ChartFrame>
    );

    expect(screen.getByRole("region", { name: "Overview chart" })).toBeInTheDocument();
    expect(screen.getByTestId("chart-content")).toBeInTheDocument();
    expect(screen.queryByTestId("chart-frame-header")).not.toBeInTheDocument();
  });

  it("renders title and subtitle when provided", () => {
    render(
      <ChartFrame title="Stats by Type" subtitle="Gen 1 sample">
        <div>chart body</div>
      </ChartFrame>
    );

    expect(screen.getByRole("region", { name: "Stats by Type" })).toBeInTheDocument();
    expect(screen.getByTestId("chart-frame-title")).toHaveTextContent("Stats by Type");
    expect(screen.getByTestId("chart-frame-subtitle")).toHaveTextContent("Gen 1 sample");
  });
});
