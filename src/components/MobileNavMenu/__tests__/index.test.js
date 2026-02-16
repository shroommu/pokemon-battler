import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileNavMenu from "..";

jest.mock("next/link", () => {
  return ({ children, href, onClick, ...props }) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
});

describe("MobileNavMenu", () => {
  it("opens menu, shows nav links, and closes on each link click", async () => {
    const user = userEvent.setup();
    render(<MobileNavMenu />);

    const menuButton = screen.getByRole("button", { name: /menu/i });

    await user.click(menuButton);
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

    await user.click(menuButton);
    await user.click(screen.getByText("Pokedex"));
    expect(screen.queryByTestId("mobile-menu-container")).not.toBeInTheDocument();

    await user.click(menuButton);
    await user.click(screen.getByText("Analyze"));
    expect(screen.queryByTestId("mobile-menu-container")).not.toBeInTheDocument();
  });
});
