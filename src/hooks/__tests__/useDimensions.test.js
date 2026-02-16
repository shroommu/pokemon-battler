import { act, render, screen, waitFor } from "@testing-library/react";
import { useRef } from "react";
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
});
