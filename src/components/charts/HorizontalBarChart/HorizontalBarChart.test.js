import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HorizontalBarChart from "./HorizontalBarChart";

jest.mock("d3", () => {
  const max = (arr) => Math.max(...arr.filter((v) => v != null));
  const scaleBand = () => {
    let domainVals = [];
    let rangeVals = [0, 1];
    let pad = 0;
    const fn = (value) => {
      const idx = domainVals.indexOf(value);
      if (idx < 0) return undefined;
      const step = (rangeVals[1] - rangeVals[0]) / Math.max(domainVals.length, 1);
      return rangeVals[0] + idx * step;
    };
    fn.domain = (v) => ((domainVals = v), fn);
    fn.range = (v) => ((rangeVals = v), fn);
    fn.padding = (v) => ((pad = v), fn);
    fn.bandwidth = () => {
      const step = (rangeVals[1] - rangeVals[0]) / Math.max(domainVals.length, 1);
      return step * (1 - pad);
    };
    return fn;
  };
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
  return { max, scaleBand, scaleLinear };
});

jest.mock("./HorizontalBarItem", () => {
  return ({ testId, onClick, onMouseEnter, onMouseLeave }) => (
    <g data-testid={testId}>
      <rect
        data-testid={`${testId}-hitbox`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </g>
  );
});

jest.mock("./HorizontalBarReferenceLine", () => {
  return ({ testId, onClick, onMouseEnter, onMouseLeave }) => (
    <g data-testid={testId}>
      <rect
        data-testid={`${testId}-hitbox`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </g>
  );
});

jest.mock("../components/Tooltip", () => {
  return ({ interactionData }) => (
    <div data-testid="tooltip-mock">
      {interactionData ? interactionData.children : null}
    </div>
  );
});

describe("HorizontalBarChart", () => {
  it("renders bars/reference lines and updates tooltip interactions", async () => {
    const user = userEvent.setup();

    render(
      <HorizontalBarChart
        width={300}
        height={200}
        showReferenceLine
        referenceLineFillColor="#ccc"
        barFillColor="#f00"
        fixedDomainMax={100}
        data={[
          {
            name: "HP",
            value: 50,
            referenceLine: 40,
            tooltipText: "HP: ",
            referenceLineTooltipText: "AVG HP: ",
          },
        ]}
      />
    );

    expect(screen.getByTestId("horizontal-bar-chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("HP-bar-item")).toBeInTheDocument();
    expect(screen.getByTestId("HP-reference-line")).toBeInTheDocument();

    await user.click(screen.getByTestId("HP-bar-item-hitbox"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("HP: 50");

    await user.click(screen.getByTestId("HP-reference-line-hitbox"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("AVG HP: 40");
  });
});
