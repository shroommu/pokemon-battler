import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Histogram from ".././Histogram";

jest.mock("d3", () => {
  const max = (arr) => Math.max(...arr.filter((v) => v != null));
  const min = (arr) => Math.min(...arr.filter((v) => v != null));
  const scaleLinear = () => {
    let domainVals = [0, 1];
    let rangeVals = [0, 1];
    const fn = (value) => {
      const ratio = (value - domainVals[0]) / (domainVals[1] - domainVals[0] || 1);
      return rangeVals[0] + ratio * (rangeVals[1] - rangeVals[0]);
    };
    fn.domain = (v) => ((domainVals = v), fn);
    fn.range = (v) => ((rangeVals = v), fn);
    fn.ticks = (count) => {
      const step = (domainVals[1] - domainVals[0]) / (count - 1 || 1);
      return Array.from({ length: count }, (_, i) => domainVals[0] + i * step);
    };
    return fn;
  };

  return { min, max, scaleLinear };
});

jest.mock("../../components/Tooltip", () => {
  return ({ interactionData }) => (
    <div data-testid="tooltip-mock">
      {interactionData ? interactionData.children : null}
    </div>
  );
});

describe("Histogram", () => {
  it("renders histogram bars and updates tooltip interactions", async () => {
    const user = userEvent.setup();

    render(
      <Histogram
        width={300}
        height={200}
        bins={[
          { x0: 0, x1: 10, length: 3 },
          { x0: 10, x1: 20, length: 6 },
        ]}
      />
    );

    expect(screen.getByTestId("histogram-container")).toBeInTheDocument();
    expect(screen.getByTestId("histogram-bin-0")).toBeInTheDocument();
    expect(screen.getByTestId("histogram-bin-1")).toBeInTheDocument();

    await user.hover(screen.getByTestId("histogram-bin-0"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("0 - 10: 3");
    await user.unhover(screen.getByTestId("histogram-bin-0"));
    expect(screen.getByTestId("tooltip-mock")).toBeEmptyDOMElement();

    await user.click(screen.getByTestId("histogram-bin-1"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("10 - 20: 6");
  });

  it("renders the x-axis line and ticks", () => {
    render(
      <Histogram
        width={300}
        height={200}
        bins={[
          { x0: 0, x1: 10, length: 3 },
          { x0: 10, x1: 20, length: 6 },
        ]}
      />
    );

    // Check for the x-axis line
    const svg = screen.getByTestId("histogram-container").querySelector("svg");
    const axisLine = Array.from(svg.querySelectorAll("line")).find(
      (line) =>
        line.getAttribute("x1") === "0" &&
        line.getAttribute("y1") === line.getAttribute("y2") &&
        line.getAttribute("stroke") === "#808080"
    );
    expect(axisLine).toBeInTheDocument();

    // Check for at least one x-axis tick label
    const tickLabels = Array.from(svg.querySelectorAll("text")).filter(
      (text) => text.getAttribute("y") > 180 // y > boundsHeight, rough check
    );
    expect(tickLabels.length).toBeGreaterThan(0);
  });

  it("handles empty bins gracefully", () => {
    render(<Histogram width={300} height={200} bins={[]} />);

    expect(screen.getByTestId("histogram-container")).toBeInTheDocument();
    expect(screen.queryByTestId("histogram-bin-0")).not.toBeInTheDocument();
  });
});
