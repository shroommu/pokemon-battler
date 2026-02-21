import { render, screen } from "@testing-library/react";
import StarChart from ".././StarChart";

jest.mock("d3", () => ({
  interpolateNumber: (start, end) => (t) => start + (end - start) * t,
}));

const animatedStarMock = jest.fn(({ fill }) => (
  <g data-testid="animated-star-mock" data-fill={fill} />
));

jest.mock(".././AnimatedStar", () => {
  return (props) => animatedStarMock(props);
});

jest.mock(".././AnimatedValueLabel", () => {
  return ({ value }) => <text data-testid="value-label-mock">{value}</text>;
});

describe("StarChart", () => {
  beforeEach(() => {
    animatedStarMock.mockClear();
  });

  it("renders labels/grid and both stars when reference is enabled", () => {
    render(
      <StarChart
        width={300}
        height={300}
        data={[
          { name: "HP", value: 100, referenceLine: 80 },
          { name: "Attack", value: 90, referenceLine: 70 },
          { name: "Defense", value: 80, referenceLine: 60 },
          { name: "Special", value: 95, referenceLine: 75 },
          { name: "Speed", value: 85, referenceLine: 65 },
        ]}
        fillColor="#f42"
        showReferenceStar
        referenceStarFillColor="#ccc"
      />
    );

    expect(screen.getByTestId("star-chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("grid-group")).toBeInTheDocument();
    expect(screen.getByTestId("labels-group")).toBeInTheDocument();
    expect(screen.getAllByTestId("value-label-mock")).toHaveLength(5);
    expect(animatedStarMock).toHaveBeenCalledTimes(2);
  });

  it("renders a radial gradient definition and applies url fill when fillGradient is provided", () => {
    const { container } = render(
      <StarChart
        width={300}
        height={300}
        data={[
          { name: "HP", value: 100, referenceLine: 80 },
          { name: "Attack", value: 90, referenceLine: 70 },
          { name: "Defense", value: 80, referenceLine: 60 },
          { name: "Special", value: 95, referenceLine: 75 },
          { name: "Speed", value: 85, referenceLine: 65 },
        ]}
        fillColor="#f42"
        fillGradient={{
          type: "radial",
          cx: "50%",
          cy: "50%",
          r: "60%",
          stops: [
            { offset: "0%", color: "#f42" },
            { offset: "100%", color: "#89f" },
          ],
        }}
      />
    );

    const gradient = container.querySelector("radialGradient");
    const stops = container.querySelectorAll("stop");
    const statsStarCall = animatedStarMock.mock.calls[0][0];

    expect(gradient).toBeInTheDocument();
    expect(stops).toHaveLength(2);
    expect(statsStarCall.fill).toMatch(/^url\(#.+\)$/);
  });
});
