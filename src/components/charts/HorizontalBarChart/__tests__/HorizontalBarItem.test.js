import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HorizontalBarItem from ".././HorizontalBarItem";

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

    rect.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(3);
    expect(screen.getByRole("button", { name: "HP: 42" })).toBeInTheDocument();
    expect(rect).toHaveAttribute("tabindex", "0");
  });

  it("uses default bar color and low-width opacity branch", () => {
    const { container } = render(
      <svg>
        <HorizontalBarItem
          testId="item-low"
          name="ATK"
          value={10}
          barHeight={8}
          barWidth={50}
          x={0}
          y={0}
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

  it("uses barFill when provided", () => {
    const { container } = render(
      <svg>
        <HorizontalBarItem
          testId="item-gradient"
          name="SPD"
          value={70}
          barHeight={8}
          barWidth={50}
          barFill="url(#bar-gradient)"
          barColor="#fff"
          x={0}
          y={0}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onClick={() => {}}
        />
      </svg>
    );

    const rect = container.querySelector("rect");
    expect(rect).toHaveAttribute("fill", "url(#bar-gradient)");
  });
});
