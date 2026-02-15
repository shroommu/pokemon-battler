import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileNavMenu from ".";

jest.mock("next/link", () => {
  return ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("MobileNavMenu", () => {
  it("opens menu and shows nav links", async () => {
    const user = userEvent.setup();
    render(<MobileNavMenu />);

    await user.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByTestId("mobile-menu-container")).toBeInTheDocument();
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Pokedex").closest("a")).toHaveAttribute(
      "href",
      "/pokedex/"
    );
    expect(screen.getByText("Analyze").closest("a")).toHaveAttribute(
      "href",
      "/analytics/"
    );

    await user.click(screen.getByText("Home"));
    expect(screen.queryByTestId("mobile-menu-container")).not.toBeInTheDocument();
  });
});
