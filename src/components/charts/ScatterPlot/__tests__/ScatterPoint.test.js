import { fireEvent, render, screen } from "@testing-library/react";

import ScatterPoint from "../ScatterPoint";

jest.mock("react-spring", () => {
  const React = require("react");
  const mk = (tag) =>
    React.forwardRef((props, ref) => React.createElement(tag, { ...props, ref }, props.children));

  return {
    animated: { circle: mk("circle") },
    useSpring: (config) => {
      const opacityValue = config?.to?.opacity ?? 1;
      const pulseScaleValue = config?.to?.pulseScale ?? 1;

      return {
        opacity: opacityValue,
        pulseScale: { to: (fn) => fn(pulseScaleValue) },
      };
    },
  };
});

describe("ScatterPoint", () => {
  it("renders with defaults and triggers event handlers", () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();

    render(
      <svg>
        <ScatterPoint
          testId="scatter-point"
          cx={10}
          cy={20}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </svg>
    );

    const point = screen.getByTestId("scatter-point");
    const hitArea = screen.getByTestId("scatter-point-hit-area");

    expect(point).toHaveAttribute("cx", "10");
    expect(point).toHaveAttribute("cy", "20");
    expect(point).toHaveAttribute("r", "5");
    expect(point).toHaveAttribute("fill", "#2563eb");
    expect(point).toHaveAttribute("stroke", "#ffffff");
    expect(point).toHaveAttribute("stroke-width", "1");
    expect(point).toHaveAttribute("opacity", "1");
    expect(hitArea).toHaveAttribute("r", "12");

    fireEvent.mouseEnter(hitArea);
    fireEvent.mouseLeave(hitArea);
    fireEvent.click(hitArea);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports custom styling and missing handlers", () => {
    render(
      <svg>
        <ScatterPoint
          testId="scatter-point-custom"
          cx={5}
          cy={6}
          radius={8}
          fill="#111111"
          stroke="#eeeeee"
          strokeWidth={3}
        />
      </svg>
    );

    const point = screen.getByTestId("scatter-point-custom");
    const hitArea = screen.getByTestId("scatter-point-custom-hit-area");

    expect(point).toHaveAttribute("r", "8");
    expect(point).toHaveAttribute("fill", "#111111");
    expect(point).toHaveAttribute("stroke", "#eeeeee");
    expect(point).toHaveAttribute("stroke-width", "3");
    expect(point).toHaveAttribute("opacity", "1");
    expect(hitArea).toHaveAttribute("r", "16");

    expect(() => {
      fireEvent.mouseEnter(hitArea);
      fireEvent.mouseLeave(hitArea);
      fireEvent.click(hitArea);
    }).not.toThrow();
  });

  it("uses CSS transition for hover growth", () => {
    render(
      <svg>
        <ScatterPoint testId="scatter-point-hover" cx={12} cy={14} radius={10} />
      </svg>
    );

    const point = screen.getByTestId("scatter-point-hover");
    const hitArea = screen.getByTestId("scatter-point-hover-hit-area");

    expect(point).toHaveAttribute("r", "10");
    expect(hitArea).toHaveAttribute("r", "20");
    expect(point).toHaveStyle({
      transition: "transform 70ms ease-in-out",
      transformOrigin: "center",
      transformBox: "fill-box",
      transform: "scale(1)",
    });

    fireEvent.mouseEnter(hitArea);
    expect(point).toHaveStyle({ transform: "scale(1.5)" });

    fireEvent.mouseLeave(hitArea);
    expect(point).toHaveStyle({ transform: "scale(1)" });
  });
});
