import { fireEvent, render, screen } from "@testing-library/react";

import ScatterPoint from "../ScatterPoint";

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

    expect(point).toHaveAttribute("cx", "10");
    expect(point).toHaveAttribute("cy", "20");
    expect(point).toHaveAttribute("r", "5");
    expect(point).toHaveAttribute("fill", "#2563eb");
    expect(point).toHaveAttribute("stroke", "#ffffff");
    expect(point).toHaveAttribute("stroke-width", "1");

    fireEvent.mouseEnter(point);
    fireEvent.mouseLeave(point);
    fireEvent.click(point);

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

    expect(point).toHaveAttribute("r", "8");
    expect(point).toHaveAttribute("fill", "#111111");
    expect(point).toHaveAttribute("stroke", "#eeeeee");
    expect(point).toHaveAttribute("stroke-width", "3");

    expect(() => {
      fireEvent.mouseEnter(point);
      fireEvent.mouseLeave(point);
      fireEvent.click(point);
    }).not.toThrow();
  });
});
