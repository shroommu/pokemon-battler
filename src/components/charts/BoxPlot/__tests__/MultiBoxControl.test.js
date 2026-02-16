import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiBoxControl from ".././MultiBoxControl";

describe("MultiBoxControl", () => {
  it("toggles all filters and individual filters", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(
      <MultiBoxControl
        filterList={["Fire", "Water"]}
        activeFilters={{ All: false, Fire: true, Water: false }}
        onChange={onChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    expect(onChange).toHaveBeenLastCalledWith({ All: true, Fire: true, Water: true });

    await user.click(checkboxes[2]);
    expect(onChange).toHaveBeenLastCalledWith({ All: false, Fire: true, Water: true });

    await user.click(checkboxes[1]);
    expect(onChange).toHaveBeenLastCalledWith({ All: false, Fire: false, Water: false });

    await user.click(checkboxes[0]);
    expect(onChange).toHaveBeenLastCalledWith({ All: false, Fire: false, Water: false });
  });
});
