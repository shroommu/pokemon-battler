import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HorizontalBarItem from "./HorizontalBarItem";

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
        barWidth: { to: (fn) => fn(to.barWidth ?? 0) },
        value: { to: (fn) => fn(to.value ?? 0) },
        valueOpacity: to.valueOpacity ?? 0,
        y: to.y ?? 0,
      };
    },
  };
});

describe("HorizontalBarItem", () => {
  it("renders and triggers interactions", async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <svg>
        <HorizontalBarItem
          testId="item"
          name="HP"
          value={42}
          barHeight={10}
          barWidth={100}
          barColor="#fff"
          x={0}
          y={0}
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
});
