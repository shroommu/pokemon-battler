import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders project description", () => {
    render(<AboutPage />);

    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(
      screen.getByText(/A Project by Alex Kruckenberg/i)
    ).toBeInTheDocument();
  });
});
