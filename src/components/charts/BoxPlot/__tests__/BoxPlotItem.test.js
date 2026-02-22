import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BoxPlotItem from ".././BoxPlotItem";

jest.mock("react-spring", () => {
  const React = require("react");
  const unwrap = (value) =>
    value && typeof value === "object" && typeof value.to === "function"
      ? value.to((v) => v)
      : value;
  const sanitize = (props) =>
    Object.fromEntries(Object.entries(props).map(([k, v]) => [k, unwrap(v)]));
  const mk = (tag) =>
    React.forwardRef((props, ref) =>
      React.createElement(tag, { ...sanitize(props), ref }, props.children)
    );
  return {
    animated: {
      line: mk("line"),
      rect: mk("rect"),
      g: mk("g"),
      circle: mk("circle"),
    },
    useSpring: (config) => {
      const to = config.to || {};
      return {
        minX: to.minX ?? 0,
        q1X: to.q1X ?? 0,
        meanX: to.meanX ?? 0,
        q3X: to.q3X ?? 0,
        maxX: to.maxX ?? 0,
        boxWidth: to.boxWidth ?? 0,
      };
    },
    useSprings: (length, configs) =>
      Array.from({ length }, (_, index) => {
        const config = Array.isArray(configs) ? configs[index] : configs(index);
        const to = config?.to || {};
        return {
          cx: to.cx ?? 0,
          opacity: to.opacity ?? 0,
        };
      }),
  };
});

describe("BoxPlotItem", () => {
  it("renders box plot geometry and point interaction callbacks", async () => {
    const setInteractionData = jest.fn();
    const user = userEvent.setup();

    const { container, getByTestId } = render(
      <svg>
        <BoxPlotItem
          data={{
            min: 10,
            q1: 20,
            mean: 30,
            q3: 40,
            max: 100,
            dataPoints: [
              { name: "A", max_stats: 25, tooltip: <div>A tooltip</div> },
              { name: "B", max_stats: 50, tooltip: <div>B tooltip</div> },
            ],
          }}
          valueKey="max_stats"
          width={200}
          height={20}
          yPos={30}
          fillColor="#abc"
          setInteractionData={setInteractionData}
          tooltipOffset={10}
        />
      </svg>
    );

    expect(getByTestId("quantile-box")).toBeInTheDocument();
    expect(getByTestId("mean-line")).toBeInTheDocument();

    const point = container.querySelector("circle[data-testid='A']");
    await user.hover(point);
    expect(setInteractionData).toHaveBeenCalled();
    await user.unhover(point);
    expect(setInteractionData).toHaveBeenLastCalledWith(null);
    await user.click(point);
    expect(setInteractionData).toHaveBeenCalled();

    point.focus();
    await user.keyboard("{Enter}");
    expect(setInteractionData).toHaveBeenCalled();

    expect(screen.getByRole("button", { name: "A: 25" })).toBeInTheDocument();
  });
});
