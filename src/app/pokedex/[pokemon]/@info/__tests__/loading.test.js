import { render, screen } from "@testing-library/react";
import Loading from ".././loading";

describe("@info loading", () => {
  it("renders info loading skeleton", () => {
    render(<Loading />);
    expect(screen.getByTestId("sub-page-skeleton-container")).toBeInTheDocument();
  });
});
