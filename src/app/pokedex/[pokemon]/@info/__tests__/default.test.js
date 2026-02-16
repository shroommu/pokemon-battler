import { render, screen } from "@testing-library/react";
import Default from ".././default";

describe("@info default", () => {
  it("renders info skeleton", () => {
    render(<Default />);
    expect(screen.getByTestId("sub-page-skeleton-container")).toBeInTheDocument();
  });
});
