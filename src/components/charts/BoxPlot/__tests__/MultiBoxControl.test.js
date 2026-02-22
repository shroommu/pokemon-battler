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

    const allCheckbox = screen.getByRole("checkbox", { name: "All" });
    const fireCheckbox = screen.getByRole("checkbox", { name: "Fire" });
    const waterCheckbox = screen.getByRole("checkbox", { name: "Water" });
    expect(screen.getByRole("group", { name: "Filter categories" })).toBeInTheDocument();

    await user.click(allCheckbox);
    expect(onChange).toHaveBeenLastCalledWith({ All: true, Fire: true, Water: true });

    await user.click(waterCheckbox);
    expect(onChange).toHaveBeenLastCalledWith({ All: false, Fire: true, Water: true });

    await user.click(fireCheckbox);
    expect(onChange).toHaveBeenLastCalledWith({ All: false, Fire: false, Water: false });

    await user.click(allCheckbox);
    expect(onChange).toHaveBeenLastCalledWith({ All: true, Fire: true, Water: true });
  });
});
