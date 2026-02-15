import { render, screen } from "@testing-library/react";
import TypeTable from "../TypeTable";

describe("TypeTable", () => {
  it("renders type matchup values", () => {
    const { container } = render(<TypeTable />);

    expect(container.querySelector("table")).toBeInTheDocument();
    expect(screen.getAllByTestId("Fire-type-pill").length).toBeGreaterThan(1);
    expect(screen.getAllByText("2x").length).toBeGreaterThan(0);
    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });
});
