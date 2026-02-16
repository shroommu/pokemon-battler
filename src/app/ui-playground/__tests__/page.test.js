import { render, screen } from "@testing-library/react";
import UIPlayground from ".././page";

jest.mock("@/components/charts/Histogram/Histogram", () => () => (
  <div data-testid="histogram-mock" />
));

describe("UIPlayground", () => {
  it("renders histogram playground component", () => {
    render(<UIPlayground />);
    expect(screen.getByTestId("histogram-mock")).toBeInTheDocument();
  });
});
