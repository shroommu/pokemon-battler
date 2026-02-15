import { render, screen } from "@testing-library/react";
import Menu from "../Menu";

describe("Menu", () => {
  it("renders children", () => {
    render(
      <Menu>
        <span>Inner</span>
      </Menu>
    );

    expect(screen.getByText("Inner")).toBeInTheDocument();
  });
});
