import { render, screen } from "@testing-library/react";
import Default from ".././default";

describe("@details default", () => {
  it("renders details skeleton", () => {
    render(<Default />);
    expect(screen.getByTestId("sub-page-skeleton-container")).toBeInTheDocument();
  });
});
