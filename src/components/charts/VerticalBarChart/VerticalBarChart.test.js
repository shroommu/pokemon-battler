import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VerticalBarChart from "./VerticalBarChart";

jest.mock("d3", () => {
  const max = (arr) => Math.max(...arr.filter((v) => v != null));
  const scaleBand = () => {
    let domainVals = [];
    let rangeVals = [0, 1];
    let pad = 0;
    const fn = (value) => {
      if (value === "MISSING") return undefined;
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

jest.mock("./VerticalBarItem", () => {
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

jest.mock("./VerticalBarReferenceLine", () => {
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

describe("VerticalBarChart", () => {
  it("renders bars/reference lines and updates tooltip interactions", async () => {
    const user = userEvent.setup();

    render(
      <VerticalBarChart
        width={300}
        height={200}
        showReferenceLine
        referenceLineFillColor="#ccc"
        barFillColor="#f00"
        fixedDomainMax={100}
        data={[
          {
            name: "Speed",
            value: 60,
            referenceLine: 55,
            tooltipText: "Speed: ",
            referenceLineTooltipText: "AVG Speed: ",
          },
        ]}
      />
    );

    expect(screen.getByTestId("vertical-bar-chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("Speed-bar-item")).toBeInTheDocument();
    expect(screen.getByTestId("Speed-reference-line")).toBeInTheDocument();

    await user.hover(screen.getByTestId("Speed-bar-item-hitbox"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("Speed: 60");
    await user.unhover(screen.getByTestId("Speed-bar-item-hitbox"));
    expect(screen.getByTestId("tooltip-mock")).toBeEmptyDOMElement();

    await user.click(screen.getByTestId("Speed-reference-line-hitbox"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("AVG Speed: 55");
    await user.unhover(screen.getByTestId("Speed-reference-line-hitbox"));
    expect(screen.getByTestId("tooltip-mock")).toBeEmptyDOMElement();
  });

  it("covers computed domain branch paths and undefined scale values", () => {
    const data = [
      {
        name: "Defense",
        value: 55,
        referenceLine: 65,
        tooltipText: "Defense: ",
        referenceLineTooltipText: "AVG Defense: ",
      },
      {
        name: "MISSING",
        value: 20,
        referenceLine: 10,
        tooltipText: "Missing: ",
        referenceLineTooltipText: "AVG Missing: ",
      },
    ];

    const { rerender } = render(
      <VerticalBarChart width={300} height={200} showReferenceLine data={data} />
    );

    expect(screen.getByTestId("Defense-bar-item")).toBeInTheDocument();
    expect(screen.queryByTestId("MISSING-bar-item")).not.toBeInTheDocument();
    expect(screen.getByTestId("Defense-reference-line")).toBeInTheDocument();
    expect(screen.queryByTestId("MISSING-reference-line")).not.toBeInTheDocument();

    rerender(
      <VerticalBarChart width={300} height={200} showReferenceLine={false} data={data} />
    );

    expect(screen.getByTestId("Defense-bar-item")).toBeInTheDocument();
    expect(screen.queryByTestId("Defense-reference-line")).not.toBeInTheDocument();
  });
});
