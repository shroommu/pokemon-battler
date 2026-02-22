import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "../Dropdown";

describe("Dropdown", () => {
  it("opens and closes list on clicks", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown buttonText="Open" buttonType="primary" testId="sample">
        <div>Item A</div>
      </Dropdown>
    );

    const trigger = screen.getByRole("button", { name: "Open" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu", { name: "Open menu" })).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu", { name: "Open menu" })).toBeInTheDocument();

    await user.click(screen.getByRole("menu", { name: "Open menu" }));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu", { name: "Open menu" })).not.toBeInTheDocument();
  });
});
