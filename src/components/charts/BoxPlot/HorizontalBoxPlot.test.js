import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HorizontalBoxPlot from "./HorizontalBoxPlot";

jest.mock("d3", () => {
  const scaleLinear = () => {
    let domainVals = [0, 1];
    let rangeVals = [0, 1];
    const fn = (value) => {
      const ratio = (value - domainVals[0]) / (domainVals[1] - domainVals[0] || 1);
      return rangeVals[0] + ratio * (rangeVals[1] - rangeVals[0]);
    };
    fn.domain = (v) => ((domainVals = v), fn);
    fn.range = (v) => ((rangeVals = v), fn);
    fn.ticks = (count) => Array.from({ length: count }, (_, i) => i * 10);
    return fn;
  };
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
  return { scaleLinear, scaleBand };
});

jest.mock("@/hooks/useDimensions", () => ({
  useDimensions: () => ({ width: 80, height: 40 }),
}));

jest.mock("../components/Tooltip", () => {
  return ({ interactionData }) => (
    <div data-testid="tooltip-mock">{interactionData ? "has-tooltip" : "no-tooltip"}</div>
  );
});

jest.mock("./BoxPlotItem", () => {
  return ({ yPos, fillColor, setInteractionData }) => (
    <g data-testid="boxplot-item-mock">
      <rect
        data-testid={`boxplot-item-${fillColor}`}
        onClick={() =>
          setInteractionData({ xPos: 1, yPos: yPos || 0, children: <span>x</span> })
        }
      />
    </g>
  );
});

jest.mock("./MultiBoxControl", () => {
  return ({ onChange }) => (
    <div data-testid="multi-control-mock">
      <button type="button" onClick={() => onChange({ Fire: true, Water: true, All: true })}>
        toggle-all
      </button>
    </div>
  );
});

describe("HorizontalBoxPlot", () => {
  const data = {
    Fire: { data: { min: 10, max: 100, dataPoints: [{ name: "c" }] }, displayColor: "#f42" },
    Water: { data: { min: 10, max: 100, dataPoints: [] }, displayColor: "#39f" },
  };

  it("renders chart, labels, controls, and active filtered item", async () => {
    const user = userEvent.setup();
    render(
      <HorizontalBoxPlot
        width={500}
        height={300}
        fixedDomainMax={100}
        valueKey="max_stats"
        filterList={["Fire", "Water"]}
        data={data}
        multi
        xLabel="Max Stats"
      />
    );

    expect(screen.getByTestId("boxplot-and-controls-container")).toBeInTheDocument();
    expect(screen.getByTestId("padding-group")).toBeInTheDocument();
    expect(screen.getByTestId("plot-label-group")).toBeInTheDocument();
    expect(screen.getByTestId("multi-control-mock")).toBeInTheDocument();
    expect(screen.getByTestId("boxplot-item-#f42")).toBeInTheDocument();
    expect(screen.queryByTestId("boxplot-item-#39f")).not.toBeInTheDocument();

    await user.click(screen.getByText("toggle-all"));
    expect(screen.queryByTestId("boxplot-item-#39f")).not.toBeInTheDocument();
  });

  it("does not activate any default filter when filterList is empty", () => {
    render(
      <HorizontalBoxPlot
        width={500}
        height={300}
        fixedDomainMax={100}
        valueKey="max_stats"
        filterList={[]}
        data={data}
      />
    );

    expect(screen.getByTestId("padding-group")).toBeInTheDocument();
    expect(screen.queryByTestId("boxplot-item-#f42")).not.toBeInTheDocument();
  });

  it("does not render inner svg group when width is zero", () => {
    render(
      <HorizontalBoxPlot
        width={0}
        height={300}
        fixedDomainMax={100}
        valueKey="max_stats"
        filterList={["Fire"]}
        data={data}
      />
    );

    expect(screen.queryByTestId("padding-group")).not.toBeInTheDocument();
  });
});
