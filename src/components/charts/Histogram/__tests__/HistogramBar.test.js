import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HistogramBar from ".././HistogramBar";

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
    animated: { rect: mk("rect"), text: mk("text"), g: mk("g") },
    useSpring: (config) => {
      const to = config.to || {};
      return {
        y: { to: (fn) => fn(to.y ?? 0) },
        barHeight: to.barHeight ?? 0,
        valueOpacity: to.valueOpacity ?? 0,
      };
    },
  };
});

describe("HistogramBar", () => {
  it("renders count and triggers tooltip interactions", async () => {
    const showTooltip = jest.fn();
    const setInteractionData = jest.fn();
    const user = userEvent.setup();

    const { container, getByTestId } = render(
      <svg>
        <HistogramBar
          bin={{ x0: 0, x1: 10, length: 5 }}
          index={2}
          x={10}
          y={20}
          barWidth={30}
          barHeight={50}
          barFillColor="#abc123"
          showTooltip={showTooltip}
          setInteractionData={setInteractionData}
        />
      </svg>
    );

    // verify rendered elements
    const group = getByTestId("histogram-bin-2");
    expect(group).toBeInTheDocument();

    const rect = container.querySelector("rect");
    const text = container.querySelector("text");

    expect(rect).toHaveAttribute("fill", "#abc123");
    expect(text).toHaveTextContent("5");
    // when barHeight > 30 the opacity should show the value
    expect(text).toHaveAttribute("opacity", "1");

    await user.hover(rect);
    expect(showTooltip).toHaveBeenCalled();

    // clear so we can assert the click separately
    showTooltip.mockClear();

    await user.unhover(rect);
    expect(setInteractionData).toHaveBeenCalledWith(null);

    await user.click(rect);
    expect(showTooltip).toHaveBeenCalled();

    rect.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(showTooltip.mock.calls.length).toBeGreaterThanOrEqual(4);
    expect(
      screen.getByRole("button", { name: "0 to 10: 5" })
    ).toBeInTheDocument();
    expect(rect).toHaveAttribute("tabindex", "0");
  });

  it("falls back to default color and hides value for short bars", () => {
    const { container } = render(
      <svg>
        <HistogramBar
          bin={{ length: 1 }}
          index={0}
          x={0}
          y={0}
          barWidth={10}
          barHeight={10} // less than 30 should hide value
          showTooltip={() => {}}
          setInteractionData={() => {}}
        />
      </svg>
    );

    const rect = container.querySelector("rect");
    const text = container.querySelector("text");

    expect(rect).toHaveAttribute("fill", "blue");
    expect(text).toHaveAttribute("opacity", "0");
  });
});
