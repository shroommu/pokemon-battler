import { render, screen } from "@testing-library/react";
import Dashboard from "./page";

describe("Dashboard", () => {
  it("renders signed in message", () => {
    render(<Dashboard />);
    expect(screen.getByText("You are signed in!")).toBeInTheDocument();
  });
});
