import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRef, useState } from "react";
import { useDimensions } from ".././useDimensions";

function Example() {
  const ref = useRef(null);
  const { width, height } = useDimensions(ref);

  return (
    <div>
      <div ref={ref}>target</div>
      <output data-testid="dims">{`${width}x${height}`}</output>
    </div>
  );
}

function ExampleNoRef() {
  const ref = useRef(null);
  const { width, height } = useDimensions(ref);

  return <output data-testid="dims-no-ref">{`${width}x${height}`}</output>;
}

function ExampleDelayedRefMount() {
  const [showTarget, setShowTarget] = useState(false);
  const ref = useRef(null);
  const { width, height } = useDimensions(ref);

  return (
    <div>
      <button
        type="button"
        data-testid="toggle-target"
        onClick={() => setShowTarget(true)}
      >
        show
      </button>
      {showTarget && <div ref={ref}>target</div>}
      <output data-testid="dims-delayed-ref">{`${width}x${height}`}</output>
    </div>
  );
}

describe("useDimensions", () => {
  it("reads ref dimensions and updates on resize", async () => {
    const widthGetter = jest
      .spyOn(HTMLElement.prototype, "offsetWidth", "get")
      .mockReturnValue(120);
    const heightGetter = jest
      .spyOn(HTMLElement.prototype, "offsetHeight", "get")
      .mockReturnValue(80);

    render(<Example />);

    await waitFor(() => {
      expect(screen.getByTestId("dims")).toHaveTextContent("120x80");
    });

    widthGetter.mockReturnValue(200);
    heightGetter.mockReturnValue(100);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("dims")).toHaveTextContent("200x100");
    });
  });

  it("returns zero dimensions when target ref is not attached", async () => {
    render(<ExampleNoRef />);

    await waitFor(() => {
      expect(screen.getByTestId("dims-no-ref")).toHaveTextContent("0x0");
    });
  });

  it("measures dimensions when ref target mounts after initial render", async () => {
    jest.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(180);
    jest.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(90);

    render(<ExampleDelayedRefMount />);

    expect(screen.getByTestId("dims-delayed-ref")).toHaveTextContent("0x0");

    fireEvent.click(screen.getByTestId("toggle-target"));

    await waitFor(() => {
      expect(screen.getByTestId("dims-delayed-ref")).toHaveTextContent("180x90");
    });
  });
});
