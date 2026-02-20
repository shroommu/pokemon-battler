import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScatterPlot from "../ScatterPlot";

jest.mock("d3", () => {
  const extent = (arr) => {
    const filtered = arr.filter((v) => v != null);
    if (!filtered.length) {
      return [undefined, undefined];
    }

    return [Math.min(...filtered), Math.max(...filtered)];
  };

  const scaleLinear = () => {
    let domainVals = [0, 1];
    let rangeVals = [0, 1];

    const fn = (value) => {
      const ratio = (value - domainVals[0]) / (domainVals[1] - domainVals[0] || 1);
      return rangeVals[0] + ratio * (rangeVals[1] - rangeVals[0]);
    };

    fn.domain = (vals) => {
      domainVals = vals;
      return fn;
    };

    fn.range = (vals) => {
      rangeVals = vals;
      return fn;
    };

    fn.nice = () => fn;

    fn.ticks = (count) => {
      const step = (domainVals[1] - domainVals[0]) / (count - 1 || 1);
      return Array.from({ length: count }, (_, idx) => domainVals[0] + idx * step);
    };

    return fn;
  };

  return { extent, scaleLinear };
});

jest.mock("../../components/Tooltip", () => {
  return ({ interactionData }) => (
    <div data-testid="tooltip-mock">
      {interactionData ? interactionData.children : null}
    </div>
  );
});

describe("ScatterPlot", () => {
  it("defaults both x and y axes to a 0-based domain", () => {
    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { name: "Bulbasaur", values: { hp: 45, attack: 49 } },
          { name: "Charmander", values: { hp: 39, attack: 52 } },
          { name: "Squirtle", values: { hp: 44, attack: 48 } },
        ]}
        axisOptions={["hp", "attack"]}
        initialXAxisKey="hp"
        initialYAxisKey="attack"
      />
    );

    const xAxis = screen.getByTestId("scatter-plot-x-axis");
    const yAxis = screen.getByTestId("scatter-plot-y-axis");

    const xHasZeroTick = Array.from(xAxis.querySelectorAll("text")).some(
      (label) => Number(label.textContent) === 0
    );
    const yHasZeroTick = Array.from(yAxis.querySelectorAll("text")).some(
      (label) => Number(label.textContent) === 0
    );

    expect(xHasZeroTick).toBe(true);
    expect(yHasZeroTick).toBe(true);
  });

  it("shows point tooltip data and updates selected axes", async () => {
    const user = userEvent.setup();

    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { values: { hp: 10, attack: 20 } },
          { label: "Fallback Label", values: { hp: 15, speed: 30 } },
        ]}
        axisOptions={["hp", "attack", "speed"]}
        initialXAxisKey="hp"
        initialYAxisKey="attack"
      />
    );

    await user.hover(screen.getByTestId("scatter-point-0"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("Point 1");
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("hp: 10");
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("attack: 20");
    expect(screen.getByTestId("scatter-plot-x-axis-label")).toHaveTextContent("hp");
    expect(screen.getByTestId("scatter-plot-y-axis-label")).toHaveTextContent("attack");

    await user.unhover(screen.getByTestId("scatter-point-0"));
    expect(screen.getByTestId("tooltip-mock")).toBeEmptyDOMElement();

    await user.selectOptions(
      screen.getByTestId("scatter-plot-y-axis-control").querySelector("select"),
      "speed"
    );

    expect(screen.getByTestId("scatter-plot-y-axis-label")).toHaveTextContent("speed");

    await user.click(screen.getByTestId("scatter-point-1"));
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("Fallback Label");
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("speed: 30");
  });

  it("matches axis keys case-insensitively when resolving point values", async () => {
    const user = userEvent.setup();

    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { name: "Bulbasaur", hp: 45, attack: 49 },
          { name: "Charmander", hp: 39, attack: 52 },
        ]}
        axisOptions={["HP", "Attack"]}
        initialXAxisKey="HP"
        initialYAxisKey="Attack"
      />
    );

    await user.hover(screen.getByTestId("scatter-point-0"));

    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("Bulbasaur");
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("HP: 45");
    expect(screen.getByTestId("tooltip-mock")).toHaveTextContent("Attack: 49");
  });

  it("falls back to derived axis keys from stats when initial keys are invalid", () => {
    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { name: "Pikachu", stats: { speed: 90, special: 50 } },
          { name: "Snorlax", stats: { speed: 30, special: 65 } },
        ]}
        initialXAxisKey="not-a-key"
        initialYAxisKey="still-not-a-key"
      />
    );

    const xSelect = screen
      .getByTestId("scatter-plot-x-axis-control")
      .querySelector("select");
    const ySelect = screen
      .getByTestId("scatter-plot-y-axis-control")
      .querySelector("select");

    expect(xSelect).toHaveValue("speed");
    expect(ySelect).toHaveValue("special");
  });

  it("uses numeric top-level keys and handles equal-domain values", () => {
    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { numberOnly: 0 },
          { numberOnly: 0 },
        ]}
      />
    );

    expect(screen.getByTestId("scatter-point-0")).toBeInTheDocument();
    expect(screen.getByTestId("scatter-point-1")).toBeInTheDocument();
  });

  it("uses pointColor for each plotted point", () => {
    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { values: { hp: 10, attack: 20 }, pointColor: "#f42" },
          { values: { hp: 20, attack: 30 }, pointColor: "#39f" },
        ]}
        axisOptions={["hp", "attack"]}
        initialXAxisKey="hp"
        initialYAxisKey="attack"
      />
    );

    expect(screen.getByTestId("scatter-point-0")).toHaveAttribute("fill", "#f42");
    expect(screen.getByTestId("scatter-point-1")).toHaveAttribute("fill", "#39f");
  });

  it("handles empty data and non-positive dimensions without plotting", () => {
    render(<ScatterPlot width={0} height={240} data={[]} />);

    expect(screen.getByTestId("scatter-plot-container")).toBeInTheDocument();
    expect(screen.queryByTestId("scatter-point-0")).not.toBeInTheDocument();
    expect(screen.queryByTestId("scatter-plot-x-axis")).not.toBeInTheDocument();
    expect(screen.queryByTestId("scatter-plot-y-axis")).not.toBeInTheDocument();
  });

  it("derives axis options from values objects when axisOptions are omitted", () => {
    render(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { name: "Bulbasaur", values: { hp: 45, attack: 49 } },
          { name: "Ivysaur", values: { hp: 60, attack: 62 } },
        ]}
      />
    );

    const xSelect = screen
      .getByTestId("scatter-plot-x-axis-control")
      .querySelector("select");
    const ySelect = screen
      .getByTestId("scatter-plot-y-axis-control")
      .querySelector("select");

    expect(xSelect).toHaveValue("hp");
    expect(ySelect).toHaveValue("attack");
  });

  it("uses default data prop and ignores non-object values while deriving keys", () => {
    const { rerender } = render(<ScatterPlot width={320} height={240} />);

    expect(screen.getByTestId("scatter-plot-container")).toBeInTheDocument();

    rerender(
      <ScatterPlot
        width={320}
        height={240}
        data={[
          { values: 7, stats: { speed: 15, defense: 20 } },
          { values: 9, stats: { speed: 30, defense: 35 } },
        ]}
      />
    );

    const xSelect = screen
      .getByTestId("scatter-plot-x-axis-control")
      .querySelector("select");
    const ySelect = screen
      .getByTestId("scatter-plot-y-axis-control")
      .querySelector("select");

    expect(xSelect).toHaveValue("speed");
    expect(ySelect).toHaveValue("defense");
  });
});
