import { render } from "@testing-library/react";
import { Skeleton, SVGSkeleton } from "../LoadingIndicators";

describe("LoadingIndicators", () => {
  it("renders Skeleton with busy semantics and custom class", () => {
    const { container } = render(<Skeleton className="h-4 w-40" />);
    const loader = container.firstChild;

    expect(loader).toHaveAttribute("aria-busy", "true");
    expect(loader).toHaveAttribute("aria-live", "polite");
    expect(loader).toHaveClass("h-4", "w-40");
  });

  it("renders SVGSkeleton with animation classes", () => {
    const { container } = render(<SVGSkeleton className="h-8 w-8" />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("h-8", "w-8", "animate-pulse");
  });
});
