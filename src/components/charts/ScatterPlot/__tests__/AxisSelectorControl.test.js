import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AxisSelectorControl from "../AxisSelectorControl";

describe("AxisSelectorControl", () => {
  it("renders axis options and invokes change handlers", async () => {
    const user = userEvent.setup();
    const onXAxisChange = jest.fn();
    const onYAxisChange = jest.fn();

    render(
      <AxisSelectorControl
        axisOptions={["hp", "attack", "speed"]}
        xAxisKey="hp"
        yAxisKey="attack"
        onXAxisChange={onXAxisChange}
        onYAxisChange={onYAxisChange}
      />
    );

    const xSelect = screen
      .getByTestId("scatter-plot-x-axis-control")
      .querySelector("select");
    const ySelect = screen
      .getByTestId("scatter-plot-y-axis-control")
      .querySelector("select");

    expect(screen.getByTestId("scatter-plot-axis-selector-control")).toBeInTheDocument();
    expect(xSelect).toHaveValue("hp");
    expect(ySelect).toHaveValue("attack");

    await user.selectOptions(xSelect, "speed");
    await user.selectOptions(ySelect, "hp");

    expect(onXAxisChange).toHaveBeenCalledWith("speed");
    expect(onYAxisChange).toHaveBeenCalledWith("hp");
  });
});
