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

    expect(screen.queryByTestId("sample-list")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByTestId("sample-list")).toBeInTheDocument();
    await user.click(screen.getByTestId("sample-list"));
    expect(screen.queryByTestId("sample-list")).not.toBeInTheDocument();
  });
});
