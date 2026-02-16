import { render, screen } from "@testing-library/react";
import Header from "../Header";

jest.mock("../Nav", () => () => <div data-testid="nav-mock" />);
jest.mock("../MobileNavMenu", () => () => (
  <div data-testid="mobile-nav-mock" />
));

describe("Header", () => {
  it("renders lightbulbs and navigation", () => {
    render(<Header />);

    expect(screen.getByTestId("big-lightbulb")).toBeInTheDocument();
    expect(screen.getByTestId("red-lightbulb")).toBeInTheDocument();
    expect(screen.getByTestId("yellow-lightbulb")).toBeInTheDocument();
    expect(screen.getByTestId("green-lightbulb")).toBeInTheDocument();
    expect(screen.getByTestId("nav-mock")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-mock")).toBeInTheDocument();
  });
});
