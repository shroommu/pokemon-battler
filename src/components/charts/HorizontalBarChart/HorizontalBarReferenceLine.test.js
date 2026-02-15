import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HorizontalBarReferenceLine from "./HorizontalBarReferenceLine";

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
    animated: { g: mk("g"), rect: mk("rect"), text: mk("text") },
    useSpring: (config) => {
      const to = config.to || {};
      return {
        x: { to: (fn) => fn(to.x ?? 0) },
        opacity: to.opacity ?? 0,
      };
    },
  };
});

describe("HorizontalBarReferenceLine", () => {
  it("renders and handles mouse/click interactions", async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <svg>
        <HorizontalBarReferenceLine
          testId="ref"
          value={25}
          barHeight={10}
          barWidth={8}
          color="#999"
          x={40}
          y={5}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </svg>
    );

    const group = container.querySelector("g[data-testid='ref']");
    await user.hover(group);
    await user.unhover(group);
    await user.click(group);

    expect(onMouseEnter).toHaveBeenCalled();
    expect(onMouseLeave).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });
});
