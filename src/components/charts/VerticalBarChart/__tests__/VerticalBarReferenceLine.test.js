import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VerticalBarReferenceLine from ".././VerticalBarReferenceLine";

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
        y: { to: (fn) => fn(to.y ?? 0) },
        opacity: to.opacity ?? 0,
      };
    },
  };
});

describe("VerticalBarReferenceLine", () => {
  it("renders and handles interactions", async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    const user = userEvent.setup();

    const { container } = render(
      <svg>
        <VerticalBarReferenceLine
          testId="ref"
          barHeight={8}
          barWidth={20}
          color="#aaa"
          x={20}
          y={40}
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

    group.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(3);
    expect(
      screen.getByRole("button", { name: "Average reference line" })
    ).toBeInTheDocument();
    expect(group).toHaveAttribute("tabindex", "0");
  });
});
