import { render, screen } from "@testing-library/react";
import Default from ".././default";

describe("@header default", () => {
  it("renders header skeleton", () => {
    render(<Default />);
    expect(screen.getByTestId("sub-page-skeleton-container")).toBeInTheDocument();
  });
});
