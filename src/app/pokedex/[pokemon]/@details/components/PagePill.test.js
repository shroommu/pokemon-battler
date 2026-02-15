import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PagePill from "./PagePill";

describe("PagePill", () => {
  it("renders text, selected style, and click handler", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<PagePill text="Moves" selected onClick={onClick} />);

    const pill = screen.getByText("Moves");
    expect(pill).toHaveClass("bg-gray-400");

    await user.click(pill);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
