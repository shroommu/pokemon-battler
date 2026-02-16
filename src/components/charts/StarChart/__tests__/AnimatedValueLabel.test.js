import { render, screen } from "@testing-library/react";
import AnimatedValueLabel from ".././AnimatedValueLabel";

jest.mock("react-spring", () => {
  const React = require("react");
  return {
    animated: {
      text: (props) => <text {...props} />,
    },
    useSpring: (config) => ({
      x: config.to.x,
      y: config.to.y,
      value: { to: (fn) => fn(config.to.value) },
    }),
  };
});

describe("AnimatedValueLabel", () => {
  it("renders rounded animated value", () => {
    render(
      <svg>
        <AnimatedValueLabel centerX={0} centerY={0} x={10} y={12} value={42.4} />
      </svg>
    );

    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
