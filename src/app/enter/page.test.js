import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EnterPage from "./page";

const springApis = [];
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("react-spring", () => {
  const React = require("react");
  return {
    useSpring: jest.fn((initializer) => {
      const config = initializer();
      const api = { start: jest.fn() };
      springApis.push(api);
      return [config.from ?? {}, api];
    }),
    animated: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      path: (props) => <path {...props} />,
      rect: (props) => <rect {...props} />,
      circle: (props) => <circle {...props} />,
    },
    to: (value, mapFn) => mapFn(value ?? 0),
    easings: { easeOutQuad: "easeOutQuad" },
  };
});

describe("EnterPage", () => {
  beforeEach(() => {
    springApis.length = 0;
    pushMock.mockClear();
  });

  it("renders enter screen and starts cover animation on click", async () => {
    const user = userEvent.setup();
    const { container } = render(<EnterPage />);

    const overlay = container.querySelector(".drop-shadow-sm");
    expect(overlay).toBeInTheDocument();

    await user.click(overlay);
    expect(springApis.length).toBe(3);
    expect(springApis[2].start).toHaveBeenCalledWith({
      from: { y: 0, height: 100 },
      to: { y: 100, height: 0 },
      delay: 300,
    });
  });
});
