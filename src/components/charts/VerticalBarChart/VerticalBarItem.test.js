import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VerticalBarItem from "./VerticalBarItem";

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
        value: { to: (fn) => fn(to.value ?? 0) },
        valueOpacity: to.valueOpacity ?? 0,
      };
    },
  };
});

describe("VerticalBarItem", () => {
  it("renders and triggers interactions", async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <svg>
        <VerticalBarItem
          testId="item"
          name="HP"
          value={42}
          barOrigin={100}
          barHeight={60}
          barWidth={20}
          barColor="#fff"
          x={0}
          y={40}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </svg>
    );

    const rect = container.querySelector("rect");
    await user.hover(rect);
    await user.unhover(rect);
    await user.click(rect);

    expect(onMouseEnter).toHaveBeenCalled();
    expect(onMouseLeave).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  it("uses default bar color and low-height opacity branch", () => {
    const { container } = render(
      <svg>
        <VerticalBarItem
          testId="item-low"
          name="DEF"
          value={8}
          barOrigin={100}
          barHeight={20}
          barWidth={20}
          x={0}
          y={80}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onClick={() => {}}
        />
      </svg>
    );

    const rect = container.querySelector("rect");
    const texts = container.querySelectorAll("text");

    expect(rect).toHaveAttribute("fill", "#ffffffff");
    expect(texts[0]).toHaveAttribute("opacity", "0");
  });
});
