import { render, screen } from "@testing-library/react";
import Loading from ".././loading";

describe("@details loading", () => {
  it("renders loading skeleton", () => {
    render(<Loading />);
    expect(screen.getByTestId("sub-page-skeleton-container")).toBeInTheDocument();
  });
});
