import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EnterPage from "./page";

const springApis = [];
const springConfigs = [];
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
      springConfigs.push(config);
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
    springConfigs.length = 0;
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

  it("executes spring onRest callbacks for color transition and navigation", async () => {
    const { container } = render(<EnterPage />);

    await act(async () => {
      springConfigs[2].onRest();
    });

    expect(springApis[1].start).toHaveBeenCalledWith({
      from: { color: "#9ca3af" },
      to: { color: "#e4e4e7" },
      config: { duration: 1000 },
    });

    await waitFor(() => {
      expect(container.querySelector(".drop-shadow-sm")).not.toBeInTheDocument();
    });

    act(() => {
      springConfigs[1].onRest();
    });
    expect(springApis[0].start).toHaveBeenCalledWith({
      from: { opacity: 0.5 },
      to: { opacity: 0 },
      config: { duration: 1000 },
      delay: 500,
    });

    act(() => {
      springConfigs[0].onRest();
    });
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
