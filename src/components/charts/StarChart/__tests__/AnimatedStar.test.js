import { render } from "@testing-library/react";
import AnimatedStar from ".././AnimatedStar";

jest.mock("react-spring", () => {
  const React = require("react");
  return {
    animated: {
      path: (props) => <path {...props} />,
    },
    useSpring: (config) => ({ d: config.to.d }),
  };
});

describe("AnimatedStar", () => {
  it("builds path string from provided points", () => {
    const { container } = render(
      <svg>
        <AnimatedStar
          fill="#f00"
          starPoints={[
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 1, y: 2 },
            { x: 0, y: 1.5 },
          ]}
        />
      </svg>
    );

    const path = container.querySelector("path");
    expect(path).toHaveAttribute("d", "M 1 1 L 2 1 L 2 2 L 1 2 L 0 1.5 Z");
    expect(path).toHaveAttribute("fill", "#f00");
  });
});
